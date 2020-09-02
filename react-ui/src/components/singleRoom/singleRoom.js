import React from 'react'
// import styled from 'styled-components'
import MessageList from './messageList'
import { withRouter } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Row, Col } from 'react-bootstrap'
import UsersList from './usersList'
//import Player from './player'

export const SingleRoom = (props) => {
  const roomId = props.match.params.roomId

  const { loading, error, data, subscribeToMore } = useQuery(GET_ROOM_INFO, {
    variables: { roomId },
  })

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  const messages = data.getSingleRoom.messages
  const songs = data.getSingleRoom.songs
  console.log(data.getSingleRoom, 'singleRoom data')
  console.log(data.getSingleRoom.users, 'users')
  const users = data.getSingleRoom.users

  return (
    <div>
      <h1>This room is liiiiit</h1>
      <h2>Room Name: {data.getSingleRoom.name}</h2>
      <p>Room Description: {data.getSingleRoom.description}</p>
      <Row>
        {/* <Col className="music-player">
          <Player
                     roomId={roomId}
          songs={songs}
          subscribeToNewSongs={() =>
            subscribeToMore({
              document: SONG_CREATED,
              variables: { roomId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const songCreated = subscriptionData.data.songCreated
                return Object.assign({}, prev, {
                  getSingleRoom: {
                    songs: [
                      songCreated,
                      ...prev.getSingleRoom.songs,
                    ],
                  },
                })
              },
            })
          }
          />
        </Col> */}
      </Row>
      <UsersList users={users} />
      <Row>
        <Col className="music-player">Music Player</Col>
        Placeholder for Music Player: Listen to some DJ Khaled dawg!
        <Col className="chat-room">
          <MessageList
            roomId={roomId}
            messages={messages}
            subscribeToNewMessages={() =>
              subscribeToMore({
                document: MESSAGE_CREATED,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev
                  const messageCreated = subscriptionData.data.messageCreated
                  return Object.assign({}, prev, {
                    getSingleRoom: {
                      messages: [
                        messageCreated,
                        ...prev.getSingleRoom.messages,
                      ],
                    },
                  })
                },
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
        users {
          spotifyUsername
        }
      }
      users {
        spotifyUsername
      }
    }
  }
`

const MESSAGE_CREATED = gql`
  subscription messageCreated($roomId: ID!) {
    messageCreated(roomId: $roomId) {
      message
      user {
        spotifyUsername
      }
    }
  }
`
