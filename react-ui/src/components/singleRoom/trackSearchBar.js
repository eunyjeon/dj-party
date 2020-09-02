import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCombobox } from 'downshift'

// TODO: query me to get access token?



function TrackSearchBar() {
  const [inputItems, setInputItems] = useState([])
  const [tracks, setTracks] = useState([])
  const [track, setTrack] = useState({}) //TODO: for user click && will be added to playlist

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: `https://api.spotify.com/v1/search`,
  //     params: {
  //         q: 'jazz',
  //         type: 'track'
  //     },
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': "Bearer BQC5p7g5YUsYretSzf8dEF3DBkCcj2NTmto5fzq8PWt4WBKIxD5GXNGSi4LzzMAs2uKA-EkFtyRgy8xAWZ8PdjDmdZRTJ8SZvzTGNf73PgTb1-ni1Um0-VbCf_z6_LzjvFAZP9XM9kXdTH4u2zL4aGEKzu3PJ_AZnO5V0ZzXiNxU1wAYfqlA289SQf97zCCwS5CQxIOIU441EA",
  //     }})
  //     .then(res => {
  //       console.log(res)
  //       setTracks(res.data.tracks.items)
  //     })
  // })

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
        axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/search`,
      params: {
          q: 'jazz',
          type: 'track'
      },
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer BQC5p7g5YUsYretSzf8dEF3DBkCcj2NTmto5fzq8PWt4WBKIxD5GXNGSi4LzzMAs2uKA-EkFtyRgy8xAWZ8PdjDmdZRTJ8SZvzTGNf73PgTb1-ni1Um0-VbCf_z6_LzjvFAZP9XM9kXdTH4u2zL4aGEKzu3PJ_AZnO5V0ZzXiNxU1wAYfqlA289SQf97zCCwS5CQxIOIU441EA",
      }})
      .then(res => {
        console.log(res)
        setTracks(res.data.tracks.items)
      })

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
          enterBotton="Search"
          size="large"
        />
      </div>
      <ul {...getMenuProps}>
        {isOpen &&
          inputItems.map((item, index) => (
            <span
              key={item.id} {...getItemProps({item, index})}
              onClick={() => setTrack(item)}
            >
              <li style={highlightedIndex === index? {background: "#ede"} : {}}>
                <h4>{item}</h4>
              </li>
            </span>
          ))
        }
      </ul>
    </div>
  )
}

export default TrackSearchBar

