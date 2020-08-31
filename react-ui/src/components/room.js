import React from 'react'
// import styled from 'styled-components'
import { ChatRoom } from './'
import { withRouter } from 'react-router-dom'
// import { gql } from 'apollo-boost'
import { gql, useQuery } from '@apollo/client'
import {Container, Row, Col} from 'react-bootstrap'

const GET_ROOM_INFO = gql`
query getSingleRoom($roomId: ID!){
 getSingleRoom(roomId: $roomId){
    id
    name
    description
    messages{
      message
    	user{
        spotifyUsername
      }
  	}
  }
}
`
// //docs says $repoFullName insgtead of $id but idk what that means
// //https://www.apollographql.com/docs/react/data/subscriptions/#when-to-use-subscriptions
// // should On be capital or lower? docs use both...
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

export const Room = (props) => {
  const roomId = props.match.params.roomId

  //console.log("these are the props for the Room component", props)
  // const [messageList, setMessages] = useState([])
  const { loading, error, data } = useQuery(GET_ROOM_INFO, {variables: { roomId }
  })

  //console.log("this is the data", data)

  // useEffect(() => {
  //   if(data) {
  //     console.log(data)
  //     setMessages(data)
  //   }
  // }, [data])

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  //TODO: component for music player (maybe on left(music) | right(chat) )??
  //
  const messages = data.getSingleRoom.messages
  //console.log("these are the messages", messages)

  return (
    <div>
       {/* <ChatRoom roomId={roomId}/> */}
      <h1>This room is liiiiit</h1>
      <h2>Room Name: {data.getSingleRoom.name}</h2>
      <p>Room Description: {data.getSingleRoom.description}</p>
      {/* {MessagesPageWithData({ params })} */}
      <Container>
        <Row>
          <Col className="music-player">Music Player</Col>
            Placeholder for Music Player: Listen to some DJ Khaled dawg!
          <Col className="chat-room">
            <ChatRoom messages={messages}/>
          </Col>
          </Row>
      </Container>
      </div>
  )
}

export default withRouter(Room)
