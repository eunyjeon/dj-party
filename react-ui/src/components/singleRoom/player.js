// import React, {Component} from 'react'
import {ScriptCache} from '../utilities/scriptCache'
import {getSpotifyAccess, SpotifyAccess} from '../utilities/localStorage'
import {FaPause, FaPlay} from 'react-icons/fa'


import React, { Component, Fragment } from 'react';

class Player extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
	}
    this.playerCheckInterval = null;
  }

  handleLogin() {
    if (this.state.token !== "") {
      this.setState({ loggedIn: true })
      // cehck every second for the player
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  async checkForPlayer() {
	const { token } = this.state;

    // if the SPotify SDK has loaded
    if (window.Spotify !== null) {
	  // cancel the interval
	  console.log('token', token)
      clearInterval(this.playerCheckInterval);
      // create a new player
      this.player = new window.Spotify.Player({
        name: "Spotify Player",
        getOAuthToken: cb => { 
          cb(token); 
        }
	  });
	  console.log(this.player, 'player')
	  console.log('hi')

      this.createEventHandlers();

      // finally, connect
      this.player.connect().then(success => {
		if (success) {
		  console.log('The Web Playback SDK successfully connected to Spotify!');
		}
	  })
    }
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); })
    this.player.on('authentification_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });

    // Playback status update
    this.player.on('player_state_changed', state => { console.log(state); });

    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));

    // Ready
    this.player.on('ready', async data => {
      let { device_id } = data;
      console.log("Let the music play on !");
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    })
  }

  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": true,
      }),
    });
  }

  onStateChanged(state) {
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position, 
        duration, 
        trackName, 
        albumName, 
        artistName,
        playing
      });
    }
  }

  onPrevClick() {
    this.player.previousTrack();
  }
  
  onPlayClick() {
    this.player.togglePlay();
  }
  
  onNextClick() {
    this.player.nextTrack();
  }

  render() {
    const {
      token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing,
    } = this.state;

    return (
     <div className="App"> 
      <div className="App-header">
        <h2>Now playing</h2>
      </div>

      {error && <p>Error: {error}</p>}

      {
        loggedIn ?
        (
          <div>
            <p>Artist: {artistName}</p>
            <p>Track: {trackName}</p>
            <p>Album: {albumName}</p>

            <p>
              <button onClick={() => this.onPrevClick()}>Previous</button>
              <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
              <button onClick={() => this.onNextClick()}>Next</button>
            </p>
          </div>
        )
        : <div>
            <p className="App-intro">
              Enter your Spotify access token here
            </p>
            <p>
              <input type="text" value={token} onChange={e => this.setState({ token: e.target.value })} />
            </p>
            <p>
              <button onClick={() => this.handleLogin()}>See Player</button>
            </p>
          </div>
      }
     </div>
    );
  }
}

// class Player extends Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 		loadingState: 'loading scripts',
// 		spotifyAccessToken: '',
// 		spotifyDeviceId: '',
// 		spotifyAuthorizationGranted: false,
// 		spotifyPlayerConnected: false,
// 		spotifyPlayerReady: false,
// 		spotifySDKLoaded: false,
// 		spotifyPlayer: undefined,
// 		spotifyAccess: SpotifyAccess.NOT_REQUESTED,
// 		playbackOn: false,
// 		playbackPaused: false
// 		}
		

// 	this.spotifySDKCallback = () => {
//         window.onSpotifyWebPlaybackSDKReady = () => {
// 			console.log('this is the error:', this.state.spotifyAccess, 'spotifyAcces', SpotifyAccess)
//             if (this.state.spotifyAccess !== SpotifyAccess.DENIED) {
//                 const spotifyPlayer = new window.Spotify.Player({
//                     name: 'React Spotify Player',
//                     getOAuthToken: cb => {
//                         cb(this.state.spotifyAccessToken)
//                     }
//                 })

//                 // Playback status updates
//                 spotifyPlayer.addListener('player_state_changed', state => {
//                     console.log(state)
//                 })

//                 this.setState({
//                     loadingState: 'spotify scripts loaded',
//                     spotifyPlayer
//                 })

//             } else {
//                 this.setState({loadingState: 'spotify authorization rejected'})
//             }
//         }
// 	}
	
// 	this.authorizeSpotifyFromStorage = (e) => {

//         if (e.key === 'spotifyAuthToken') {
//             const spotifyAccessToken = e.newValue

//             const spotifyAccess = getSpotifyAccess()

//             if (spotifyAccess === SpotifyAccess.DENIED) {
//                 this.setState({
//                     spotifyAccess: SpotifyAccess.DENIED,
//                     loadingState: 'spotify access denied'
//                 })
//             } else if (spotifyAccessToken !== null) {
//                 this.setState({
//                     spotifyAccessToken: spotifyAccessToken,
//                     spotifyAccess: SpotifyAccess.ALLOWED,
//                     loadingState: 'spotify token retrieved'
//                 })
//             }
//             this.connectToPlayer()
//         }
// 	}

// 	this.connectToPlayer = () => {
//         if (this.state.spotifyPlayer) {
//             clearTimeout(this.connectToPlayerTimeout)
//             // Ready
//             this.state.spotifyPlayer.addListener('ready', ({device_id}) => {
//                 console.log('Ready with Device ID', device_id)
//                 this.setState({
//                     loadingState: 'spotify player ready',
//                     spotifyDeviceId: device_id,
//                     spotifyPlayerReady: true
//                 })
//             })

//             // Not Ready
//             this.state.spotifyPlayer.addListener('not_ready', ({device_id}) => {
//                 console.log('Device ID has gone offline', device_id)
//             })

//             this.state.spotifyPlayer.connect()
//                 .then((ev) => {
//                     this.setState({loadingState: 'connected to player'})
//                 })
//         } else {
//             this.connectToPlayerTimeout = setTimeout(this.connectToPlayer.bind(this), 1000)
//         }
// 	}

// 	this.startPlayback = (spotify_uri) => {
//         fetch('https://api.spotify.com/v1/me/player/play?' +
//             'device_id=' + this.state.spotifyDeviceId, {
//             method: 'PUT',
//             body: JSON.stringify({uris: [spotify_uri]}),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.state.spotifyAccessToken}`
//             }
//         }).then((ev) => {
//             console.log(ev)
//             if (ev.status === 403) {
//                 this.setState({
//                     loadingState: 'you need to upgrade to premium for playback',
//                     spotifyAccess: SpotifyAccess.NO_PREMIUM
//                 })
//             } else {
//                 this.setState({
//                     loadingState: 'playback started',
//                     playbackOn: true, playbackPaused: false
//                 })
//                 console.log('Started playback', this.state)
//             }
//         }).catch((error) => {
//             this.setState({loadingState: 'playback error: ' + error})
//         })
// 	}
	
// 	this.resumePlayback = () => {
//         fetch('https://api.spotify.com/v1/me/player/play?' +
//             'device_id=' + this.state.spotifyDeviceId, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.state.spotifyAccessToken}`
//             },
//         }).then((ev) => {
//             this.setState({playbackPaused: false})
//         })
//         console.log('Started playback', this.state)
//     }

//     this.pauseTrack = () => {
//         fetch('https://api.spotify.com/v1/me/player/pause?' +
//             'device_id=' + this.state.spotifyDeviceId, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.state.spotifyAccessToken}`
//             },
//         }).then((ev) => {
//             this.setState({playbackPaused: true})
//         })
//     }

// 	new ScriptCache([
// 		{
// 			name: 'https://sdk.scdn.co/spotify-player.js',
// 			callback: this.spotifySDKCallback()
// 		}])

// 	window.addEventListener('storage', this.authorizeSpotifyFromStorage)

// 	}
//     render() {
//         return (
// 			<div>
//                 <h3>Spotify</h3>
//                 <div>
//                     {this.state.spotifyPlayerReady &&
//                     <div onClick={() => {
//                         if (!this.state.playbackOn) {
//                             this.startPlayback(this.props.playingRecordingId);
//                         } else {
//                             if (this.state.playbackPaused) {
//                                 this.resumePlayback();
//                             }
//                         }
//                     }}>
//                         <FaPlay/>
//                     </div>}
//                     {this.state.spotifyPlayerReady && this.state.playbackOn &&
//                     <div onClick={() => {
//                         if (!this.state.playbackPaused) {
//                             this.pauseTrack();
//                         }
//                     }}>
//                         <FaPause/>
//                     </div>}
//                 </div>

//                 <p>{this.state.loadingState}</p>
//             </div>
// 		)
        
//     }
// }
 

export default Player