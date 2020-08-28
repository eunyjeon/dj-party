import React from 'react'
//import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_MESSAGES } from './room'

//socket stuff
// import { useSubscription } from '@apollo/client'
// import { getMainDefinition } from '@apollo/client/utilities'

//
// import Message from './message'
//import { messageData } from './api'

// function LatestMessage({ roomId }) {
//   const {
//     data: { messageAdded },
//     loading,
//   } = useSubscription(MESSAGES_SUBSCRIPTION, { variables: { roomId } })
//   return <h4>New message: {!loading && messageAdded.message}</h4>
// }

export default function Messages() {
  // const { data } = useQuery(QUERY_MESSAGES)

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <div>
      <h1>ChatRoom</h1>
      {/* {data.messages.map((message) => ( */}
        {/* <Message key={message.id} {...message} />
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
