import React, { useState, useContext } from 'react'
import { useCombobox } from 'downshift'
import UserContext from '../../userContext'
import axios from 'axios'



function TrackSearchBar() {
  const [inputItems, setInputItems] = useState([])
  const [tracks, setTracks] = useState([])
  const [track, setTrack] = useState({}) //TODO: for user click && will be added to playlist

  const user = useContext(UserContext)
  console.log("user: ", user)

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {



      fetch("https://api.spotify.com/v1/search?", {
        method: 'GET',
        params: {
            q: `${inputItems}`,
            type: 'track'
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accssToken}`,
        },
      })
      .then((res) => res.json())
      .then(data =>{
        console.log("data ",data)
        setTracks(data.tracks)
      })

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

