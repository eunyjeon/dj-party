import React from 'react'
import styled from 'styled-components'
import { ChatRoom } from './'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

// export const QUERY_MESSAGES = gql`
//   query getMessages($roomId: RoomId!) {
//     room(roomId: $roomId) {
//       messages {
//         message
//         user
//       }
//     }
//   }
// `

export const QUERY_ROOM_MESSAGES = gql`
{getRoom($id: ID!) {
    room(id: $id) {
      messages {
        message
        user
      }
    }
  }}
`
//docs says $repoFullName insgtead of $id but idk what that means
//https://www.apollographql.com/docs/react/data/subscriptions/#when-to-use-subscriptions
// should On be capital or lower? docs use both...
// export const MESSAGES_SUBSCRIPTION = gql`
//   subscription OnMessageAdded($id: ID!) {
//     messageAdded(id: $id) {
//       id
//       user
//       message
//     }
//   }
// `

// function MessagesPageWithData({ params }) {
//   const { subscribeToMore, ...result } = useQuery(QUERY_MESSAGES, {
//     variables: { roomId: params.roomId },
//   })
//   return (
//     <ChatRoom
//       {...result}
//       subscribeToNewMessages={() =>
//         subscribeToMore({
//           document: MESSAGES_SUBSCRIPTION,
//           variables: { proomId: params.roomId },
//           updateQuery: (prev, { subscriptionData }) => {
//             if (!subscriptionData.data) return prev
//             const newFeedItem = subscriptionData.data.messageAdded
//             return Object.assign({}, prev, {
//               room: {
//                 messages: [newFeedItem, ...prev.room.messages],
//               },
//             })
//           },
//         })
//       }
//     />
//   )
// }

export default function Room(props) {
  return (
    <div>
      <h1>This room is liiiiit</h1>
      {/*       {MessagesPageWithData({ params })} */}
      <ChatRoom />
    </div>
  )
}
