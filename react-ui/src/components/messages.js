import React from 'react'
//import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import {
  QUERY_MESSAGES,
  MESSAGES_SUBSCRIPTION,
  QUERY_ROOM_MESSAGES,
} from './room'

//socket stuff
import { useSubscription } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

//
import Message from './message'
//import { messageData } from './api'

// function LatestMessage({ roomId }) {
//   const {
//     data: { messageAdded },
//     loading,
//   } = useSubscription(MESSAGES_SUBSCRIPTION, { variables: { roomId } })
//   return <h4>New message: {!loading && messageAdded.message}</h4>
// }

function loadMessages({ id }) {
  const { loading, error, data } = useQuery(QUERY_ROOM_MESSAGES, {
    variables: { id },
  })

  if (loading) return null
  if (error) return `Error! ${error}`

  return data
}

export default function Messages({ id }) {
  const messages = loadMessages(id)
  console.log('message data', messages)

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <div>
      <h1>ChatRoom</h1>
      {/*       {data.rooms.messages.map((message) => (
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
