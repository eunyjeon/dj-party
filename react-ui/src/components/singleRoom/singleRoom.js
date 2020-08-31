import React from 'react'
// import styled from 'styled-components'
import  MessageList from './messageList'
import { withRouter } from 'react-router-dom'
import { gql, useQuery} from '@apollo/client'
import {Row, Col} from 'react-bootstrap'


export const SingleRoom = (props) => {
  const roomId = props.match.params.roomId

  const { loading, error, data, subscribeToMore } = useQuery(GET_ROOM_INFO, {variables: { roomId }
  })


  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  const messages = data.getSingleRoom.messages

  return (
    <div>
       {/* <ChatRoom roomId={roomId}/> */}
      <h1>This room is liiiiit</h1>
      <h2>Room Name: {data.getSingleRoom.name}</h2>
      <p>Room Description: {data.getSingleRoom.description}</p>
      {/* {MessagesPageWithData({ params })} */}
      <Row>
        <Col className="music-player">Music Player</Col>
          Placeholder for Music Player: Listen to some DJ Khaled dawg!
        <Col className="chat-room">
          <MessageList roomId={roomId} messages={messages} subscribeToNewMessages= {()=> subscribeToMore({
              document: MESSAGE_CREATED,
              varaiables: {roomId},
              updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev
                const messageCreated = subscriptionData.data.messageCreated
                return Object.assign({}, prev, {
                  getSingleRoom: {
                    messages: [messageCreated, ...prev.getSingleRoom.messages]
                  }
                })
              }
            })
          }
        />
      </Col>
      </Row>
    </div>
  )
}

export default withRouter(SingleRoom)

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

const MESSAGE_CREATED = gql`
  subscription messageCreated($roomId:ID!) {
    messageCreated(roomId:$roomId){
      message
      user {
          spotifyUsername
      }
    }
  }`