import React from 'react'
//import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'

const GET_All_ROOMS = gql`
  query getAllRooms {
    rooms {
      id
      name
      description
      # public
    }
  }
`

export default function Rooms() {
  const { loading, error, data } = useQuery(GET_All_ROOMS)

  console.log(data)

  if (loading)
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  else if (error)
    return (
      <>
        <h1>Error! ${error.message}</h1>
      </>
    )
  else {
    return (
      <div id="roomList">
        {data.rooms.map((room) => (
          <div key={room.id}>
            <h1>{room.name}</h1>
            <p>{room.description}</p>
          </div>
        ))}
      </div>
    )
  }
}
