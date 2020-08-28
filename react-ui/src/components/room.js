import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { ChatRoom } from './'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

// export const QUERY_MESSAGES = gql`
// {
//     message(roomId: 1) {
//       id
//       message
//   }
// }
// `
//create a mutation: user joins room and their activeRoom changes

//docs says $repoFullName insgtead of $id but idk what that means
//https://www.apollographql.com/docs/react/data/subscriptions/#when-to-use-subscriptions
// should On be capital or lower? docs use both...
// export const MESSAGES_SUBSCRIPTION = gql`
// subscription OnMessageAdded($id: ID!) {
//   messageAdded(id: $id) {
//     id
//     user
//     message
//   }
// }
// `

// export const QUERY_MESSAGES = gql`
//   query getMessages($roomId : Int!)  {
//     getMessages(roomId : $roomId) {
//       id
//       message
//     }
//   }
// `
// function MessagesPageWithData(props) {
//   const { roomId }= props.location.state
//   console.log(props)
//   const { subscribeToMore, ...result } = useQuery(QUERY_MESSAGES, {
//     variables: { roomId: roomId },
//   })
  // return (
  //   <ChatRoom
  //     {...result}
  //     subscribeToNewMessages={() =>
  //       subscribeToMore({
  //         document: MESSAGES_SUBSCRIPTION,
  //         variables: { roomId: roomId },
  //         updateQuery: (prev, { subscriptionData }) => {
  //           if (!subscriptionData.data) return prev
  //           const newFeedItem = subscriptionData.data.messageAdded
  //           return Object.assign({}, prev, {
  //             room: {
  //               messages: [newFeedItem, ...prev.room.messages],
  //             },
  //           })
  //         },
  //       })
  //     }
  //   />
  // )
//}

export default function Room(props) {
  const {roomId} = props.match.params.id
  // const [messageList, setMessages] = useState([])
  // const { loading, error, data } = useQuery(QUERY_MESSAGES, {variables: {id: roomId }
  // })

  // useEffect(() => {
  //   if(data) {
  //     console.log(data)
  //     setMessages(data)
  //   }
  // }, [data])

  // if (error) return <h1>Something went wrong!</h1>
  // if (loading) return <h1>Loading...</h1>

  return (
    <div>
       <ChatRoom roomId={roomId}/>
      <h1>This room is liiiiit</h1>
      {/* {MessagesPageWithData} */}
    </div>
  )
}
