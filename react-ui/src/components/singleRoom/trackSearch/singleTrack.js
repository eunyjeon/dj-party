import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const ADD_SONG_TO_PLAYLIST = gql`
  mutation addSongToPlaylist($roomId: ID, $playlistId: String, $trackUri: String) {
    addSongToPlaylist(roomId: $roomId, playlistId: $playlistId, trackUri: $trackUri)
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
      <div onClick={handleClick}>
        <h3>{props.item.name}</h3>
        <h4>{props.item.artists[0].name}</h4>
      </div>


  )
}

export default SingleTrack
