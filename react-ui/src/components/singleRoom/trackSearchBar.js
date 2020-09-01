import React, { useEffect, useState } from 'react'
import { useCombobox } from 'downshift'

function TrackSearchBar() {
  const [inputItems, setInputItems] = useState([])
  const [tracks, setTracks] = useState([])
  const [singleTrack, setTrack] = useState('')

  useEffect(() => {
    fetch('	https://api.spotify.com/v1/search')
      .then((response) => response.json())
      .then((data) => setTrack(data))
  }, [])

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
      setInputItems(
        tracks.filter((item) =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
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
          enterBotton="Search songs"
          size="large"
        />
      </div>
      <ul {...getMenuProps}>
        {isOpen &&
          inputItems.map((item, index) => (
            <span key={item.id} {...getItemProps({item, index})} onClick={() => setTrack(item.name)}>
              <li style={highlightedIndex === index? {background: "#ede"} : {}}>
                <h4>{item.name}</h4>
              </li>
            </span>
          ))
        }
      </ul>
    </div>
  )
}

export default TrackSearchBar

