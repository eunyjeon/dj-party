import UserContext from '../../userContext'

import React, { Component, Fragment } from 'react'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
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
    console.log(user, 'user')
    this.getDeviceId()
  }

  async getDeviceId() {
    const { token } = this.state
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
    console.log('DEVICE ID RESPONSE', response)
    return response
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
      <div className="App">
        <div className="App-header">
          <h2>Now playing</h2>
        </div>

        {error && <p>Error: {error}</p>}

        <div>
          <p>Artist: {artistName}</p>
          <p>Track: {trackName}</p>
          <p>Album: {albumName}</p>

          <p>
            <button onClick={() => this.onPrevClick()}>Previous</button>
            <button onClick={() => this.onPlayClick()}>
              {playing ? 'Pause' : 'Play'}
            </button>
            <button onClick={() => this.onNextClick()}>Next</button>
          </p>
        </div>
      </div>
    )
  }
}

export default Player
