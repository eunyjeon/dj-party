import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../userContext'
import styled from 'styled-components'
import Song from './singleSong'
import { gql, useQuery } from '@apollo/client'

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

async function getSongs(playlistId, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()
  console.log('playlist data ', data)
  return data.items
}

export default function Queue(props) {
  // const user = useContext(UserContext)
  // const [token, setToken] = useState(user.accessToken)
  // const [songs, setSongs] = useState([])
  const playlistId = props.playlist
  const { loading, error, data, subscribeToMore } = useQuery(GET_PLAYLIST, {
    variables: { playlistId },
  })

  const subscribeToMoreSongs = () => {
    subscribeToMore({
      document: SONG_ADDED_TO_PLAYLIST,
      variables: { playlistId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const updatedPlaylist = subscriptionData.data.songAddedToPlaylist

        console.log('updatedPlaylist : ', updatedPlaylist)
        return Object.assign({}, prev, {
          // getPlaylist: updatedPlaylist
          getPlaylist: { tracks: updatedPlaylist },
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
        {songs.map((item) => (
          <Song
            key={item.id}
            artists={item.artists}
            albumImg={item.album.images[2]}
            name={item.name}
            album={item.album.name}
          />
        ))}
      </Tracks>
    </QueueDiv>
  )
}

const GET_PLAYLIST = gql`
  query getPlaylist($playlistId: String!) {
    getPlaylist(playlistId: $playlistId) {
      tracks {
        id
        name
        artists {
          name
        }
        album {
          name
          images {
            url
          }
        }
      }
    }
  }
`

const SONG_ADDED_TO_PLAYLIST = gql`
  subscription songAddedToPlaylist($playlistId: String) {
    songAddedToPlaylist(playlistId: $playlistId) {
      tracks {
        id
        name
        artists {
          name
        }
        album {
          name
          images {
            url
          }
        }
      }
    }
  }
`
