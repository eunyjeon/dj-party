import React from 'react'
import { gql, useQuery } from '@apollo/client'
// import { useQuery } from '@apollo/react-hooks'
// import { QUERY_MESSAGES, MESSAGES_SUBSCRIPTION } from './room'
import { useParams } from 'react-router-dom'

//socket stuff
/* import { useSubscription } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities' */

//
import Message from './message'
//import { messageData } from './api'

//subscription stuff
/* function LatestMessage({ roomId }) {
  const {
    data: { messageAdded },
    loading,
  } = useSubscription(MESSAGES_SUBSCRIPTION, { variables: { roomId } })
  return <h4>New message: {!loading && messageAdded.message}</h4>
} */

// const QUERY_MESSAGES = gql`
//   query getMessages($roomId: Int){
//       id
//       message
//     }
// `

const QUERY_MESSAGES = gql`
{
    message(roomId: 1) {
      id
      message
  }
}
`

export default function Messages({roomId}) {
  const { error, loading, data } = useQuery(QUERY_MESSAGES, {variables: { roomId },
  })
  console.log(error.toString())
  function handleSubmit(event) {
    event.preventDefault()
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>

  return (
    <div>
      <h1>ChatRoom</h1>
      <div>{data.getMessages.map(({ id, message }) => (<p key={id}>{message}</p>))}</div>
{/*       {data.getMessages.map((message) => (
        <Message key={message.id} {...message} />
      ))} */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">
          <input name="message" type="text" />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
