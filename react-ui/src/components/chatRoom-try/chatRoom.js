import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { gql, useMutation, useSubscription } from '@apollo/client'
import Message from './message'
import { GET_ROOM_INFO } from '../room'


//TODO: can we change $roomId: ID --> ID! ???
const CREATE_MESSAGE = gql`
  mutation createMessage($roomId: ID $message: String!) {
    createMessage(roomID: $roomId message: $message) {
      message
    }
  }
`

function ChatRoom(props) {
  const [variables, setVariables] = useState({
    roomId: props.match.params.roomId,
    message: ''
  })
  const [sendMessage, loading] = useMutation(CREATE_MESSAGE, {
    update: (cache, { data }) => {
      // adding the new message to the existing cached collections
      // ?. syntanx: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      const newMessageFromResponse = data?.createMessage.message
      const existingMessages = cache.readQuery({
        query: GET_ROOM_INFO,
      })

      cache.writeQuery({
        query: GET_ROOM_INFO,
        data: {
          messages: [
            ...existingMessages?.message,
            newMessageFromResponse,
          ]
        }
      })
    },
    onError: err => console.error(err)
  })

  if (loading) return <h1>Loading...</h1>

  const handleSubmit = evt => {
    evt.preventDefault()
    sendMessage({ variables })
    setVariables({...variables, message:''})
  }

  return (
    <div>
      <h1>ChatRoom</h1>
      {props.messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">
          <input
            name="message"
            type="text"
            value={variables.message}
            onChange={e =>
              setVariables({...variables, message: e.target.value})
            }
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default withRouter(ChatRoom)
