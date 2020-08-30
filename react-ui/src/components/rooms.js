import React from 'react'
import styled from 'styled-components'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

const RoomList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.primary};
`

const RoomCard = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.secondary};
  box-shadow: 5px 5px 10px black;
  flex-basis: 1fr;
  width: 250px;
  height: 300px;
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  color: black;
`

const GET_All_ROOMS = gql`
  {
    getAllRooms {
      id
      name
      description
      # public
    }
  }
`

const JOIN_ROOM = gql`
  {
    matation joinRoom($roomId:ID!) {
      joinRoom(roomId: $roomId) {
        ok
        error
      }

    }
  }
`

export default function Rooms() {

  const { loading, error, data } = useQuery(GET_All_ROOMS)
  const [joinExistingRoom,_] = useMutation(JOIN_ROOM, {
    onError: err => console.log(err)
  })

  const handleCardClick = evt => {
    evt.preventDefault()
    console.log('evt ', evt)
    joinExistingRoom(evt.key)
  }


  if (loading)
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  else if (error)
    return (
      <>
        <h1>{`Error! ${error.message}`}</h1>
      </>
    )
  else {
    return (
      <RoomList>
        {data.getAllRooms.map((room) => (
          <RoomCard key={room.id}>
            <Link to={`/room/${room.id}`} onClick={handleCardClick}>
            {/* <Link to={`/room/${room.id}`}> */}
              {' '}
              <h1 style={{ fontFamily: 'Cardo' }}>{room.name}</h1>
            </Link>
            <p>{room.description}</p>
          </RoomCard>
        ))}
      </RoomList>
    )
  }
}
