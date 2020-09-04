// // import React, { useEffect, useState } from 'react'

// // import SpotifyPlayer from 'react-spotify-web-playback';



// // export default function Player(props){
// //     return (
// //         <SpotifyPlayer
// //         token = {props.accessToken}
// //         uris={['spotify:track:55p8TQ1ggGYOO1gLQrC52D']}
// //       />
// //     )
// // }

// import React, { Component } from "react";
// import { Spinner } from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
// 	faStepForward,
// 	faPlay,
// 	faPause,
// 	faTv
// } from "@fortawesome/free-solid-svg-icons";
// import axios from 'axios'
// // import UserContext from '../../userContext'


// class Player extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			deviceId: "",
// 			error: "",
// 			trackName: "",
// 			artistName: "",
// 			albumName: "",
// 			playing: false,
// 			position: 0,
// 			duration: 0,
// 			trackImage: "",
// 			paused: false,
// 			holder: 0
// 		};
// 		this.playerCheckInterval = null;
// 	}

// 	// static contextType = UserContext

// 	componentDidMount = () => {
// 		this.playerCheckInterval = setInterval(
// 			() => this.checkForPlayer(),
// 			1000
// 		);

// 		axios({
//       method: 'GET',
//       url: 'https://api.spotify.com/v1/me/player/devices',
//       headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
// 					'Authorization': `Bearer ${this.context.accessToken}`,
// 				}});
//       }

// 	checkForPlayer() {
// 		const token = this.props.accessToken;

// 		if (window.Spotify !== null) {
// 			clearInterval(this.playerCheckInterval);
// 			this.player = new window.Spotify.Player({
// 				name: "Spotify Player",
// 				getOAuthToken: cb => {
// 					cb(token);
// 				}
// 			});
// 			this.createEventHandlers();

// 			// finally, connect!
// 			this.player.connect();
// 		}
// 	}

// 	createEventHandlers() {
// 		this.player.on("initialization_error", e => {
// 			console.error(e);
// 		});
// 		this.player.on("authentication_error", e => {
// 			console.error(e);
// 		});
// 		this.player.on("account_error", e => {
// 			console.error(e);
// 		});
// 		this.player.on("playback_error", e => {
// 			console.error(e);
// 		});

// 		// Playback status updates
// 		this.player.on("player_state_changed", state =>
// 			this.onStateChanged(state)
// 		);

// 		// Ready
// 		this.player.on("ready", data => {
// 			let { device_id } = data;
// 			console.log("Let the music play on!");
// 			this.setState({ deviceId: device_id });
// 			this.transferPlaybackHere();
// 		});
// 	}

// 	onStateChanged(state) {
// 		// if we're no longer listening to music, we'll get a null state.
// 		if (state !== null) {
// 			const {
// 				current_track: currentTrack,
// 				position,
// 				duration
// 			} = state.track_window;
// 			const trackName = currentTrack.name;
// 			const albumName = currentTrack.album.name;
// 			const trackImage = currentTrack.album.images[0].url;
// 			const artistName = currentTrack.artists
// 				.map(artist => artist.name)
// 				.join(", ");
// 			const playing = !state.paused;
// 			this.setState(
// 				{
// 					position,
// 					duration,
// 					trackName,
// 					albumName,
// 					artistName,
// 					playing,
// 					trackImage
// 				},
// 				() => {
// 					var local_this = this;
// 					if (this.state.playing) {
// 						this.setState({
// 							paused: false
// 						});
// 					} else {
// 						if (!this.state.paused) {
// 							var temp = this.state.holder + 1;
// 							this.setState(
// 								{
// 									holder: temp
// 								},
// 								() => {
// 									if (this.state.holder === 3) {
// 										local_this.props.loadSong();
// 										this.setState({
// 											holder: 0
// 										});
// 									} else {
// 										console.log(this.state.holder);
// 									}
// 								}
// 							);
// 						}
// 					}
// 				}
// 			);
// 		}
// 		if (state === null) {
// 			console.log("state null");
// 		}
// 	}

// 	onPrevClick() {
// 		this.player.previousTrack();
// 	}

// 	onPlayClick() {
// 		this.player.togglePlay();
// 		this.setState({
// 			paused: !this.state.paused
// 		});
// 	}

// 	onNextClick() {
// 		this.player.nextTrack();
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if (
// 			prevProps.currentlyPlaying !== this.props.currentlyPlaying &&
// 			this.props.currentlyPlaying
// 		) {
// 			this.play(this.props.currentlyPlaying);
// 		}
// 	}

// 	transferPlaybackHere() {
// 		const { deviceId } = this.state;
// 		const token = this.props.accessToken;
// 		fetch("https://api.spotify.com/v1/me/player", {
// 			method: "PUT",
// 			headers: {
// 				authorization: `Bearer ${token}`,
// 				"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify({
// 				device_ids: [deviceId],
// 				play: false
// 			})
// 		});
// 	}
// 	play = spotify_uri => {
// 		fetch(
// 			`https://api.spotify.com/v1/me/player/play?device_id=${
// 				this.state.deviceId
// 			}`,
// 			{
// 				method: "PUT",
// 				body: JSON.stringify({ uris: ['spotify:track:55p8TQ1ggGYOO1gLQrC52D'] }),
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: `Bearer ${this.props.accessToken}`
// 				}
// 			}
// 		);
// 	};

// 	render() {

// 		const { artistName, trackName, playing, trackImage } = this.state;

// 		if (trackName !== "") {
// 			return (
// 				<div className="player">
// 					<img src={trackImage} alt="song playing" />

// 					<div>
// 						<h5>{trackName}</h5>
// 						<p>{artistName}</p>
// 						<div className="svg">
// 							<FontAwesomeIcon
// 								icon={playing ? faPause : faPlay}
// 								onClick={() => this.onPlayClick()}
// 								className="svgIcon play-skip"
// 								size={"3x"}
// 							/>
// 							{/* <FontAwesomeIcon
// 								icon={faStepForward}
// 								onClick={() => this.props.loadSong()}
// 								className="svgIcon play-skip"
// 								size={"3x"}
// 							/>
// 							<a
// 								href={`${process.env.REACT_APP_HOST}/tvmode?=${
// 									this.props.partyCode
// 								}`}
// 								target="_blank"
// 								className="tv"
// 								rel="noopener noreferrer"
// 							>
// 								<FontAwesomeIcon
// 									icon={faTv}
// 									size={"3x"}
// 									className="svgIcon play-skip"
// 									color="white"
// 								/> */}
// 							{/* </a> */}
// 						</div>
// 					</div>

// 					<p />
// 				</div>
// 			);
// 		} else {
// 			return (
// 				<div className="playertemp">
// 					<Spinner color="dark" />
// 				</div>
// 			);
// 		}
// 	}
// }


// export default Player














// // import SpotifyWebApi from 'spotify-web-api-node'
// // import React, { useEffect, useState } from 'react'
// // import styled from 'styled-components'

// // const StyledPlayer = styled.div`
// //   background-color: #e1e1e1;
// // `

// // // credentials are optional
// // const spotifyApi = new SpotifyWebApi({
// //   clientID: process.env.CLIENT_ID,
// //   clientSecret: process.env.CLIENT_SECRET,
// //   //  callbackURL: 'http://localhost:5000/callback',
// // })

// // spotifyApi.getMyCurrentPlaybackState({}).then(
// //   function (data) {
// //     // Output items
// //     console.log('Now Playing: ', data.body)
// //   },
// //   function (err) {
// //     console.log('Something went wrong!', err)
// //   }
// // )

// // export default function Player(props) {
// //   /*   useEffect(() => {
// //     props.subscribeToNewSongs()
// //   }) */

// //   return <StyledPlayer></StyledPlayer>
// // }


//  import React, { Component } from "react";


// export default class Player extends Component {
// 	public constructor(props: ISpotifyPlayerProps) {
// 		super(props);
	
// 		new ScriptCache([
// 			{
// 				name: "https://sdk.scdn.co/spotify-player.js",
// 				callback: this.spotifySDKCallback
// 			}]);
	
// 	   }])
// 	// ...
// 	}