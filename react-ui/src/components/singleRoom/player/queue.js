import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Song from './singleSong'
import { useQuery } from '@apollo/client'
import {GET_PLAYLIST, SONG_ADDED_TO_PLAYLIST} from '../../../graphql'


const QueueDiv = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 20px;
  width: 30vw;
  height: 60vh;
  box-shadow: 8px 8px 10px black;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.purple},
    ${({ theme }) => theme.darkPurple}
  );
`
const Tracks = styled.div`
  text-align: left;
  overflow: scroll;
  padding-left: 10px;
  padding-right: 10px;
  height: 90%;
  background-color: rgba(0, 0, 0, 30%);
`

export default function Queue(props) {
  const playlistId = props.playlist
  const { loading, data, subscribeToMore } = useQuery(GET_PLAYLIST, {
    variables: { playlistId },
  })

  const subscribeToMoreSongs = () => {
    subscribeToMore({
      document: SONG_ADDED_TO_PLAYLIST,
      variables: { playlistId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const updatedPlaylist = subscriptionData.data.songAddedToPlaylist
        return Object.assign({}, prev, {
          getPlaylist: {tracks : updatedPlaylist}

        })
      },
    })
  }

    useEffect(() => {
    subscribeToMoreSongs()
  })



  if (loading) return <h1>Loading...</h1>

  const songs = data.getPlaylist.tracks
  console.log(songs, 'songs')
  console.log(data.getPlaylist, 'getPlaylist')

  return (
    <QueueDiv>
      <h2>Room Playlist:</h2>
      <Tracks>
        {
          songs.map((item) => (
            <Song
              key={item.id}
              artists={item.artists}
              albumImg={item.album.images[2]}
              name={item.name}
              album={item.album.name}
            />
          ))
        }
      </Tracks>
    </QueueDiv>
  )
}


