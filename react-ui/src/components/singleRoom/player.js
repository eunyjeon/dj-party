// import SpotifyWebApi from 'spotify-web-api-node'
// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'

// const StyledPlayer = styled.div`
//   background-color: #e1e1e1;
// `

// // credentials are optional
// const spotifyApi = new SpotifyWebApi({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   //  callbackURL: 'http://localhost:5000/callback',
// })

// spotifyApi.getMyCurrentPlaybackState({}).then(
//   function (data) {
//     // Output items
//     console.log('Now Playing: ', data.body)
//   },
//   function (err) {
//     console.log('Something went wrong!', err)
//   }
// )

// export default function Player(props) {
//   /*   useEffect(() => {
//     props.subscribeToNewSongs()
//   }) */

//   return <StyledPlayer></StyledPlayer>
// }
