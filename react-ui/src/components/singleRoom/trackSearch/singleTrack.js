import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from 'styled-components'

const ADD_SONG_TO_PLAYLIST = gql`
  mutation addSongToPlaylist($roomId: ID, $playlistId: String, $trackUri: String) {
    addSongToPlaylist(roomId: $roomId, playlistId: $playlistId, trackUri: $trackUri)
  }
`

const SingleTrackDiv = styled.div`
  font-size: 2em;
  text-align: left;
  box-shadow: 2px 2px 4px black;
  padding: 2px;
  border-radius: 3px;
  :hover {
    opacity: 1;
  }
`

function SingleTrack(props) {

  const [variables, setVariables] = useState({
    roomId: props.roomId,
    playlistId: props.playlistId,
    trackUri: props.item.uri,
  })

  const [addSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST, {
    onError: (err) => console.error(err)
  })

  const handleClick = evt => {
    evt.preventDefault()
    console.log(props.playlistId)
    addSongToPlaylist({ variables })
  }

  return (
      <SingleTrackDiv onClick={handleClick}>
        <h3>{props.item.name}</h3>
        <h4>{props.item.artists[0].name}</h4>
      </SingleTrackDiv>


  )
}

export default SingleTrack
