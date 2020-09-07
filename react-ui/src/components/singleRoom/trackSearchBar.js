import React, { useState, useContext } from 'react'
import { useCombobox } from 'downshift'
import UserContext from '../../userContext'
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

function TrackSearchBar() {
  const [inputItems, setInputItems] = useState([])
  // const [tracks, setTracks] = useState([])
  const [track, setTrack] = useState({}) // TODO: Track should be added to a playlist
  const user = useContext(UserContext)
  const [token, setToken] = useState(user.accessToken)
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: async ({ inputValue }) => {
      // const urlSafeInputValue = encodeURI(inputValue)
      const params = `q=${inputValue}&type=track&limit=10`
      const searchParams = new URLSearchParams(params)

      const response = await fetch(
        'https://api.spotify.com/v1/search?' + searchParams,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      console.log('data.tracks.items: ', data.tracks.items)
      setInputItems(data.tracks.items)
      // console.log("inputItems: ", inputItems)
    },
  })
  return (
    <SongSearchDiv className="searchTrack">
      <h2>Find Song</h2>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps()}
          placeholder="Search songs"
          enterBotton="Search"
          size="large"
        />
      </div>
      <TrackList {...getMenuProps}>
        {isOpen &&
          inputItems.map((item, index) => (
            <span
              key={item.id}
              {...getItemProps({ item, index })}
              onClick={() => {
                //TODO: where to send track data??
                setTrack(item)
              }}>
              <h4
                style={
                  highlightedIndex === index ? { background: '#ede' } : {}
                }>
                {item.name}
              </h4>
              <p>{item.artists[0].name}</p>
            </span>
          ))}
      </TrackList>
    </SongSearchDiv>
  )
}
export default TrackSearchBar

const TrackList = styled.div`
  background-color: rgba(0, 0, 0, 30%);
`
