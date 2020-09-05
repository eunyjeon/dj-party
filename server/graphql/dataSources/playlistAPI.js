//this file has data for users! (decided to split up to different endpoints in case our app gets more complicated, but we can always merge later if we decide to keep it small)

const { RESTDataSource } = require('apollo-datasource-rest')

if (process.env.NODE_ENV !== 'production') require('../../../secrets')

class PlaylistAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.spotify.com/v1/"
  }
  

  aysnc getSpotifyMe(){

  }
  async createPlaylist(accessToken) {
    const response = await this.post(`users/${a}/playlists`, {
      body: JSON.stringify({
        name: `new playlist for ${req.user.id}`,
        public: false,
        collaborative: true},
        {headers: {
        'Authorization': `Bearer + ${req.user.accessToken}`,
        'Content-Type': 'application/json',
      }})
    })
    return response.JSON()
  }

  async getUsersPlaylist() {
    try {
      const response = await this.get(`users/${req.user.id}/playlists`, {}, {
        headers: {
          'Authorization': `Bearer + ${req.user.accessToken}`
        }
      })
      return Array.isArray(response) ? response.map(async playlist => this.playlistReducer(playlist)) : [];
    } catch (error) {
      console.log("can't get this user's playlist", error)
    }
  }

  async searchForAPlaylist() {
    try {
      
    } catch (error) {
      console.log(`cannot search for the playlist`, error)
    }
  }

  playlistReducer(playlist) {
    return {
      id: playlist.id,
      name: playlist.name,
      collaborative: playlist.collaborative,
      tracks: playlist.tracks,
      uri: playlist.uri
    }
  }
}

module.exports = PlaylistAPI;
