import UserContext from '../../userContext'
import styled from 'styled-components'
import React, { Component, Fragment } from 'react'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      refreshToken: '',
      deviceId: '',
      // loggedIn: false,
      error: '',
      trackName: 'Track Name',
      artistName: 'Artist Name',
      albumName: 'Album Name',
      playing: false,
      position: 0,
      duration: 0,
    }
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
  }

  static contextType = UserContext
  componentDidMount = () => {
    const user = this.context
    this.setState({ token: user.accessToken })
    console.log('user in component did mount', user)
    this.getDeviceId(user.accessToken)
  }

  async getDeviceId(token) {
    console.log('token in device id fetch', token)
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/devices',
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    //.then((response) => response.json())
    const data = await response.json()
    //.then((data) => this.setState({ deviceId: data.devices[0].id}))
    this.setState({ deviceId: data.devices[0].id })
    console.log('device id state', this.state.deviceId)
  }

  checkForPlayer() {
    const { token } = this.state

    // if the SPotify SDK has loaded
    if (window.Spotify !== null) {
      // cancel the interval
      console.log('token', token)
      clearInterval(this.playerCheckInterval)
      // create a new player
      this.player = new window.Spotify.Player({
        name: 'Spotify Player',
        getOAuthToken: (cb) => {
          cb(token)
        },
      })
      console.log(this.player, 'player')
      this.createEventHandlers()

      // finally, connect
      this.player.connect().then((success) => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!')
        }
      })
    }
  }

  createEventHandlers() {
    // Ready
    console.log('state before', this.state)
    // this.player.on('ready', async (data) => {
    //   let { device_id } = data
    //   console.log('Let the music play on !')
    //   await this.setState({ deviceId: device_id })
    //   this.transferPlaybackHere()
    // })
    this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
    })
    console.log('state after', this.state)
    this.player.on('initialization_error', (e) => {
      console.error(e)
    })
    this.player.on('authentification_error', (e) => {
      console.error(e)
      this.setState({ loggedIn: false })
    })
    this.player.on('account_error', (e) => {
      console.error(e)
    })
    this.player.on('playback_error', (e) => {
      console.error(e)
    })

    // Playback status update
    this.player.on('player_state_changed', (state) => {
      console.log(state)
    })

    // Playback status updates
    this.player.on('player_state_changed', (state) =>
      this.onStateChanged(state)
    )
  }

  transferPlaybackHere() {
    const { deviceId, token } = this.state
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true,
      }),
    })
  }

  onStateChanged(state) {
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window
      const trackName = currentTrack.name
      const albumName = currentTrack.album.name
      const artistName = currentTrack.artists
        .map((artist) => artist.name)
        .join(', ')
      const playing = !state.paused
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing,
      })
    }
  }

  onPrevClick() {
    this.player.previousTrack()
  }

  onPlayClick() {
    this.player.togglePlay()
  }

  onNextClick() {
    this.player.nextTrack()
  }

  render() {
    const {
      token,
      //   loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing,
    } = this.state

    return (
      <PlayerDiv>
        <div>
          <h2>Now playing</h2>
          {/* PLACEHOLDER change to actual responsive album img */}
          <img src="https://i.scdn.co/image/ab67616d00001e02c88548d8be6edef5730463fb" />
        </div>

        {error && <p>Error: {error}</p>}

        <div>
          <h3>Artist:</h3>
          <p>{artistName}</p>
          <h3>Track:</h3>
          <p>{trackName}</p>
          <h3>Album:</h3>
          <p>{albumName}</p>

          <p>
            <PlayerButton onClick={() => this.onPrevClick()}>
              Previous
            </PlayerButton>
            <PlayerButton onClick={() => this.onPlayClick()}>
              {playing ? 'Pause' : 'Play'}
            </PlayerButton>
            <PlayerButton onClick={() => this.onNextClick()}>Next</PlayerButton>
          </p>
        </div>
      </PlayerDiv>
    )
  }
}

const PlayerButton = styled.button`
  background-color: ${({ theme }) => theme.sky};
  color: #000000;
  font-size: 1em;
  font-weight: 800;
  margin: 0.5em;
  border-radius: 20px;
  padding: 0.5em 1em;
`

const PlayerDiv = styled.div`
  margin: 20px;
  padding: 30px;
  border-radius: 20px;
  width: 50vw;
  box-shadow: 8px 8px 10px black;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.purple},
    ${({ theme }) => theme.darkPurple}
  );
`

export default Player
