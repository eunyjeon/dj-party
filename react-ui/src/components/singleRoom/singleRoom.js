import React from 'react'
// import styled from 'styled-components'
import MessageList from './messageList'
import { withRouter } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'
import UsersList from './usersList'
import Player from './player'
import TrackSearchBar from './trackSearchBar'
import { PageDiv } from '../user-home.js'
import styled from 'styled-components'

export const RoomHeading = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.golden};
  font-weight: 800;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  font-size: 3rem;
`

export const SingleRoom = (props) => {
  const roomId = props.match.params.roomId

  const { loading, error, data, subscribeToMore } = useQuery(GET_ROOM_INFO, {
    variables: { roomId },
  })

  //if (error) return <h1>Something went wrong in the rooms!</h1>
  if (loading) return <h1>Loading...</h1>

  const messages = data.getSingleRoom.messages
  //const songs = data.getSingleRoom.songs
  console.log(data.getSingleRoom, 'singleRoom data')
  console.log(data.getSingleRoom.users, 'users')
  const users = data.getSingleRoom.users
  const accessToken = data.getSingleRoom.accessToken

  return (
    <PageDiv>
      <RoomHeading>{data.getSingleRoom.name}</RoomHeading>
      <h3>{data.getSingleRoom.description}</h3>

      <Container fluid>
        <Row>
          <Col>
            <Player accessToken={accessToken} />
            <TrackSearchBar />
          </Col>
          <Col>
            <UsersList users={users} />
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
      </Container>
    </PageDiv>
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
      }
      users {
        spotifyUsername
        accessToken
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
