import React, {useEffect, useState} from 'react'
import { gql, useMutation} from '@apollo/client'
import SingleMessage from './singleMessage'
import { Form, Button } from 'react-bootstrap'

export default function MessageList(props) {
  let input
  useEffect(() => {
    props.subscribeToNewMessages()
  })

  const [variables, setVariables] = useState({
    message: '',
    roomId: props.roomId,
})

  const [createMessage, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_MESSAGE)

  const handleSubmit = evt => {
    evt.preventDefault()
    createMessage({ variables })
}
console.log('what is happening')
  return (
  <div>
      <h1>Message List</h1>
      {props.messages.map((message) => (
      <SingleMessage key={message.id} {...message} />
      ))}
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newMessage">
              <Form.Control
                  type="text"
                  value={variables.message}
                  onChange={(e) =>
                      setVariables({ roomId: props.roomId, message: e.target.value })
                  }
                  placeholder="New Message"
              />
          </Form.Group>
          <div>
              <Button variant="primary" type="submit">
                  Send
              </Button>
          </div>
        </Form>
      {/* <form  onSubmit={e => {
            e.preventDefault()
            createMessage({ variables: { message: input.value, roomId: props.roomId} })
            input.value = ''
          }}>
      <input
            ref={node => {
              input = node
            }}
          />
      <button type="submit">Send</button>
    </form> */}
    {mutationLoading && <p>Loading...</p>}
    {mutationError && <p>Error :( Please try again</p>}
  </div>
  )
}


const CREATE_MESSAGE = gql`
mutation createMessage($message: String! $roomId: Int!) {
    createMessage(message: $message roomId: $roomId) {
          message
          user {
            spotifyUsername
        }
    }
}
`
