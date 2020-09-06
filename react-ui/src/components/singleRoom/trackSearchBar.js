import React, { useState, useContext } from 'react'
import { useCombobox } from 'downshift'
import UserContext from '../../userContext'

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

      const response = await fetch("https://api.spotify.com/v1/search?"+searchParams, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      console.log('data.tracks.items: ', data.tracks.items)
      setInputItems(
        data.tracks.items
      )
      // console.log("inputItems: ", inputItems)
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
              key={item.id} {...getItemProps({item, index})}
              onClick={() => {
                //TODO: where to send track data??
                setTrack(item)
              }}
            >
              <li style={highlightedIndex === index? {background: "#ede"} : {}}>
              <h4>{item.name} by {item.artists[0].name}</h4>
              </li>
            </span>
          ))
        }
      </ul>
    </div>
  )
}
export default TrackSearchBar
