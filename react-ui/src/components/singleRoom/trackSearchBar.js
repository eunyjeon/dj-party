import React, { useState, useContext } from 'react'
import { useCombobox } from 'downshift'
import UserContext from '../../userContext'

function TrackSearchBar() {
  const [inputItems, setInputItems] = useState([])
  const [tracks, setTracks] = useState([])
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

      const urlSafeInputValue = encodeURI(inputValue)
      const response = await fetch("https://api.spotify.com/v1/search", {
        method: 'GET',
        params: {
            q: `${urlSafeInputValue}`,
            type: 'track'
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      console.log(data)
      setTracks(data.tracks)
      setInputItems(
        tracks.filter((item) =>
          item.items.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
  })
  return (
    <div className="searchTrack">
      <h2>Find Song</h2>
      <div {...getComboboxProps()}>
        <input {...getInputProps()}
          placeholder="Search songs"
          enterBotton="Search"
          size="large"
        />
      </div>
      <ul {...getMenuProps}>
        {isOpen &&
          inputItems.map((item, index) => (
            <span
              key={item.items.id} {...getItemProps({item, index})}
              onClick={() => setTrack(item)}
            >
              <li style={highlightedIndex === index? {background: "#ede"} : {}}>
                <h4>{item.items.name}</h4>
              </li>
            </span>
          ))
        }
      </ul>
    </div>
  )
}
export default TrackSearchBar
