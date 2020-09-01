const { RESTDataSource } = require('apollo-datasource-rest')

if (process.env.NODE_ENV !== 'production') require('../../../secrets')


class PlayerAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.spotify.com/v1/"
  }

  async getCurrentPlayingTrack() {
    const {response} = await this.get(`me/player/currently-playing?market=US`, {}, {
      headers: {
        'Authorization': `Bearer + ${req.user.accessToken}`
      }
    })
    console.log("returned from search", response.item)
    return this.currentlyPlayingReducer(response.item)
  }

  currentlyPlayingReducer(result){
    return {
      id: result.id || 0,
      //artists is in an array; unsure what to do
      href: result.href,
      name: result.name,
    }
  }

}

module.exports = PlayerAPI
