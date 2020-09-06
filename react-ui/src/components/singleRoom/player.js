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
      error: '',
      trackName: 'Track Name',
      artistName: 'Artist Name',
      albumName: 'Album Name',
      playing: false,
      position: 0,
      duration: 0,

      //TODO: added from 12inch
      hasNextTrack: false,
      queue: [],
      albumImage: '',
    }
    this.playerCheckInterval = null;
  }

  static contextType = UserContext
  componentDidMount = () => {
    const user = this.context
    this.setState({ token: user.accessToken })
    console.log('user in component did mount', user)
    this.getDeviceId(user.accessToken)
    this.playerCheckInterval = setInterval(
			() => this.checkForPlayer(),
			1000
    );
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
    const data = await response.json()
    //.then((data) => this.setState({ deviceId: data.devices[0].id}))
    this.setState({ deviceId: data.devices[0].id })
    console.log('device id state', this.state.deviceId)
  }

  checkForPlayer() {
    const { token } = this.state

    // if the Spotify SDK has loaded
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
      console.log('player', this.player)
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
    this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
    })
    console.log('state after', this.state)
    this.player.on('initialization_error', (e) => {
      console.error(e)
    })
    this.player.on('authentification_error', (e) => {
      console.error(e)
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

    console.log('state before', this.state)
    this.player.on('ready', async (data) => {
      let { device_id } = data
      console.log('Let the music play on !')
      await this.setState({ deviceId: device_id })
      console.log('is this working')
      this.play('spotify:track:6EJiVf7U0p1BBfs0qqeb1f')
    })

  }

  onStateChanged(state) {
		// if we're no longer listening to music, we'll get a null state.
		if (state !== null) {
			const {
				current_track: currentTrack,
				position,
				duration
			} = state.track_window;
			const trackName = currentTrack.name;
			const albumName = currentTrack.album.name;
			const trackImage = currentTrack.album.images[0].url;
			const artistName = currentTrack.artists
				.map(artist => artist.name)
				.join(", ");
			const playing = !state.paused;
			this.setState(
				{
					position,
					duration,
					trackName,
					albumName,
					artistName,
					playing,
					trackImage
				},
				() => {
					var local_this = this;
					if (this.state.playing) {
						this.setState({
							paused: false
						});
					} else {
						if (!this.state.paused) {
							var temp = this.state.holder + 1;
							this.setState(
								{
									holder: temp
								},
								() => {
									if (this.state.holder === 3) {
										local_this.props.loadSong();
										this.setState({
											holder: 0
										});
									} else {
										console.log(this.state.holder);
									}
								}
							);
						}
					}
				}
			);
		}
		if (state === null) {
			console.log("state null");
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

  componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.currentlyPlaying !== this.props.currentlyPlaying &&
			this.props.currentlyPlaying
		) {
			this.play('spotify:track:6EJiVf7U0p1BBfs0qqeb1f');
    }

  }

   play = spotify_uri => {
    console.log('hi')
    console.log(spotify_uri)
		 fetch(
			`https://api.spotify.com/v1/me/player/play?device_id=${
				this.state.deviceId
      }`,
      {
				method: "PUT",
				body: JSON.stringify({
          "uris": ["spotify:track:6EJiVf7U0p1BBfs0qqeb1f"]
         }),
      //if you want to hook to playlist: 
			// {
			// 	method: "PUT",
			// 	body: JSON.stringify({
      //     "context_uri": "spotify:playlist:6qgZRnoXgcV1fSTfWbA3IN",
      //     "offset": {
      //       "position": 1
      //     },
      //     "position_ms": 0
      //   } ),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.state.token}`
				}
			}
		);
  };


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
