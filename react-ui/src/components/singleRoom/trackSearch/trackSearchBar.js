import React, { useContext, useState } from 'react'
import UserContext from '../../../userContext'

import SearchResult from './searchResult'

import styled from 'styled-components'

const SongSearchDiv = styled.div`
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  width: 35vw;
  box-shadow: 8px 8px 10px black;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.purple},
    ${({ theme }) => theme.darkPurple}
  );
`

const TrackList = styled.div`
  background-color: rgba(0, 0, 0, 30%);
`

function TrackSearchBar(props) {
  const user = useContext(UserContext)
  const [tracks, setTracks] = useState(null)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("")

  const search = async val => {
    setLoading(true)
    const params = `q=${val}&type=track&limit=10`
    const searchParams = new URLSearchParams(params)

    const response = await fetch(
      'https://api.spotify.com/v1/search?' + searchParams,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )

    const data = await response.json()
    // console.log('data.tracks.items: ', data.tracks.items)
    setTracks(data.tracks.items)
    setLoading(false)
  }

  const onChangeHandler = async evt => {
    search(evt.target.value);
    setValue(evt.target.value)
  };

  return (
    <SongSearchDiv>
      <h2>Find Song</h2>
      {/* TODO: onKeyDown (https://stackoverflow.com/questions/43384039/how-to-get-input-textfield-values-when-enter-key-is-pressed-in-react-js/43384732) */}
      <input
        value={value}
        onChange={evt => onChangeHandler(evt)}
        placeholder="Find song"
      />
      {
        tracks &&
        <TrackList>
          <SearchResult list={tracks} roomId={props.roomId} playlist={props.playlist} />
        </TrackList>
      }
    </SongSearchDiv>
  )
}

export default TrackSearchBar
