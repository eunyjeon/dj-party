import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'
import { withRouter } from 'react-router'
import {JOIN_ROOM, GET_All_ROOMS} from '../graphql'

const RoomList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

const RoomCard = styled.div`
  border-radius: 10px;
  padding: 10px;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.purple},
    ${({ theme }) => theme.darkPurple}
  );
  box-shadow: 8px 8px 10px black;
  flex-basis: 1fr;
  width: 250px;
  height: 275px;
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  color: black;
  opacity: 0.85;
  :hover {
    opacity: 1;
  }
`



function Rooms(props) {
  const { loading, error, data } = useQuery(GET_All_ROOMS)
  const [joinExistingRoom] = useMutation(JOIN_ROOM, {
    onError: (err) => console.error(err),
  })

  const handleCardClick = (evt) => {
    evt.preventDefault()
    joinExistingRoom({ variables: { roomId: evt.currentTarget.id } }).then(
      props.history.push(`/room/${evt.currentTarget.id}`)
    )
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
    console.log('rooms', data.getAllRooms)
    return (
      <RoomList>
        {data.getAllRooms.map((room) => (
          <RoomCard key={room.id} id={room.id} onClick={handleCardClick}>
            <h1>{room.name}</h1>
            <h4>{room.description}</h4>
            <div>{room.public ? <h2>Public</h2> : <h3>Private</h3>}</div>
          </RoomCard>
        ))}
      </RoomList>
    )
  }
}
export default withRouter(Rooms)
