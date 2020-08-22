import React, {useState, useEffect} from 'react'
import axios from 'axios'

const SpotifyWebApi = require('spotify-web-api-node')
const spotify = new SpotifyWebApi();

export default function Actually(props) {
  let [who, isShe] = useState({
    email: "",
    name: ""
  })

  useEffect(async () => {
    try {
    const {data} = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer' + props.token
        }
      })
      isShe({
        email: data.email,
        name: data.display_name
      })
    } catch (error) {
      console.log("couldn't get axios!", error)
    }
  }, [])

  return (
    <>
    <p>{who}</p>
    </>
  )

}
