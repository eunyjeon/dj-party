
import React, {Component} from 'react';
import {ScriptCache} from "../utilities/scriptCache";
import {getSpotifyAccess, SpotifyAccess} from "../utilities/localStorage";
import {FaPause, FaPlay} from "react-icons/fa";

class Player extends Component {
	constructor(props) {
        super(props);

        new ScriptCache([
            {
                name: "https://sdk.scdn.co/spotify-player.js",
                callback: this.spotifySDKCallback
            }]);

        window.addEventListener("storage", this.authorizeSpotifyFromStorage);

        this.state = {
            loadingState: "loading scripts",
            spotifyAccessToken: "",
            spotifyDeviceId: "",
            spotifyAuthorizationGranted: false,
            spotifyPlayerConnected: false,
            spotifyPlayerReady: false,
            spotifySDKLoaded: false,
            spotifyPlayer: undefined,
            spotifyAccess: SpotifyAccess.NOT_REQUESTED,
            playbackOn: false,
            playbackPaused: false
        };


    }

	spotifySDKCallback = () => {
        window.onSpotifyWebPlaybackSDKReady = () => {
			console.log('this is the error:', this.state.spotifyAccess, 'spotifyAcces', SpotifyAccess)
            if (this.state.spotifyAccess !== SpotifyAccess.DENIED) {
                const spotifyPlayer = new window.Spotify.Player({
                    name: 'React Spotify Player',
                    getOAuthToken: cb => {
                        cb(this.state.spotifyAccessToken);
                    }
                });

                // Playback status updates
                spotifyPlayer.addListener('player_state_changed', state => {
                    console.log(state);
                });


                this.setState({
                    loadingState: "spotify scripts loaded",
                    spotifyPlayer
                });

            } else {
                this.setState({loadingState: "spotify authorization rejected"});
            }
        }

    }

    authorizeSpotifyFromStorage = (e) => {

        if (e.key === "spotifyAuthToken") {
            const spotifyAccessToken = e.newValue;

            const spotifyAccess = getSpotifyAccess();

            if (spotifyAccess === SpotifyAccess.DENIED) {
                this.setState({
                    spotifyAccess: SpotifyAccess.DENIED,
                    loadingState: "spotify access denied"
                });
            } else if (spotifyAccessToken !== null) {
                this.setState({
                    spotifyAccessToken: spotifyAccessToken,
                    spotifyAccess: SpotifyAccess.ALLOWED,
                    loadingState: "spotify token retrieved"
                });
            }
            this.connectToPlayer();
        }
    }

     connectToPlayer = () => {
        if (this.state.spotifyPlayer) {
            clearTimeout(this.connectToPlayerTimeout);
            // Ready
            this.state.spotifyPlayer.addListener('ready', ({device_id}) => {
                console.log('Ready with Device ID', device_id);
                this.setState({
                    loadingState: "spotify player ready",
                    spotifyDeviceId: device_id,
                    spotifyPlayerReady: true
                });
            });

            // Not Ready
            this.state.spotifyPlayer.addListener('not_ready', ({device_id}) => {
                console.log('Device ID has gone offline', device_id);
            });

            this.state.spotifyPlayer.connect()
                .then((ev) => {
                    this.setState({loadingState: "connected to player"});
                });
        } else {
            this.connectToPlayerTimeout = setTimeout(this.connectToPlayer.bind(this), 1000);
        }
    }


     startPlayback = (spotify_uri) => {
        fetch("https://api.spotify.com/v1/me/player/play?" +
            "device_id=" + this.state.spotifyDeviceId, {
            method: 'PUT',
            body: JSON.stringify({uris: [spotify_uri]}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.spotifyAccessToken}`
            }
        }).then((ev) => {
            console.log(ev);
            if (ev.status === 403) {
                this.setState({
                    loadingState: "you need to upgrade to premium for playback",
                    spotifyAccess: SpotifyAccess.NO_PREMIUM
                });
            } else {
                this.setState({
                    loadingState: "playback started",
                    playbackOn: true, playbackPaused: false
                });
                console.log("Started playback", this.state);
            }
        }).catch((error) => {
            this.setState({loadingState: "playback error: " + error});
        })
    };

     resumePlayback = () => {
        fetch("https://api.spotify.com/v1/me/player/play?" +
            "device_id=" + this.state.spotifyDeviceId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.spotifyAccessToken}`
            },
        }).then((ev) => {
            this.setState({playbackPaused: false});
        });
        console.log("Started playback", this.state);
    }

     pauseTrack = () => {
        fetch("https://api.spotify.com/v1/me/player/pause?" +
            "device_id=" + this.state.spotifyDeviceId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.spotifyAccessToken}`
            },
        }).then((ev) => {
            this.setState({playbackPaused: true});
        })
    }

    render() {
		console.log('this is the error:', this.state.spotifyAccess, 'spotifyAcces', SpotifyAccess)
        return (
            <div >
                <h3>Spotify</h3>
                <div >
                    {this.state.spotifyPlayerReady &&
                    <div onClick={() => {
                        if (!this.state.playbackOn) {
                            this.startPlayback(this.props.playingRecordingId);
                        } else {
                            if (this.state.playbackPaused) {
                                this.resumePlayback();
                            }
                        }
                    }}>
                        <FaPlay/>
                    </div>}
                    {this.state.spotifyPlayerReady && this.state.playbackOn &&
                    <div onClick={() => {
                        if (!this.state.playbackPaused) {
                            this.pauseTrack();
                        }
                    }}>
                        <FaPause/>
                    </div>}
                </div>

                <p>{this.state.loadingState}</p>
            </div>
        );
    }
}

export default Player;