import React from 'react'
import styled from 'styled-components'
import { ChatRoom } from './chatRoom-try/chatRoom'
import { withRouter } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'

export const GET_ROOM_INFO = gql`
  query getSingleRoom($roomId: ID!) {
    getSingleRoom(roomId: $roomId) {
      id
      name
      description
      messages {
        message
        user {
          spotifyUsername
        }
      }
    }
  }
`

const Room = (props) => {
  const roomId = props.match.params.roomId

  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: { roomId },
  })

  //console.log("data in Room: ", data)

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
          <Col className="music-player">
            <Row>Music Player</Row>
            <Row>
              aceholder for Music Player: Listen to some DJ Khaled dawg!
            </Row>
          </Col>
          <Col className="chat-room">
            <ChatRoom messages={messages} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Room)
