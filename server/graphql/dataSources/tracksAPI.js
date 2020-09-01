
const { RESTDataSource } = require('apollo-datasource-rest')

//get current playing track

if (process.env.NODE_ENV !== 'production') require('../../../secrets')

class TracksAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.spotify.com/v1/"
  }
//need to add something in wrt exchanging expired access tokens

  async searchTrack(input) {
    try {
      const { searchResult } = await this.get(`search?q=${input}&type=track&market=US`, {}, {
        headers: {
          'Authorization': `Bearer + ${req.user.accessToken}`
        }
      })
      return searchResult.items
    } catch (error) {
      console.log(`can't search track: ${input}`, error)
    }
  }

  async getTrack() {
    try {
      const response = await this.get(`tracks/${track.id}`, {}, {
        headers: {
          'Authorization': `Bearer + ${req.user.accessToken}`
        }
      })
      return response;
    } catch (error) {
      console.log(`can't get this track with ID: ${track.id}`, error)
    }
  }
  tracksReducer(track){
    return {
      id: track.id,
      name: track.name
    }
  }

}

module.exports = TracksAPI

/*
{
  "album": {
    "album_type": "single",
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju"
        },
        "href": "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju",
        "id": "6sFIWsNpZYqfjUpaCgueju",
        "name": "Carly Rae Jepsen",
        "type": "artist",
        "uri": "spotify:artist:6sFIWsNpZYqfjUpaCgueju"
      }
    ],
    "external_urls": {
      "spotify": "https://open.spotify.com/album/0tGPJ0bkWOUmH7MEOR77qc"
    },
    "href": "https://api.spotify.com/v1/albums/0tGPJ0bkWOUmH7MEOR77qc",
    "id": "0tGPJ0bkWOUmH7MEOR77qc",
    "images": [
      {
        "height": 640,
        "url": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
        "width": 640
      },
      {
        "height": 300,
        "url": "https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1",
        "width": 300
      },
      {
        "height": 64,
        "url": "https://i.scdn.co/image/ab67616d000048517359994525d219f64872d3b1",
        "width": 64
      }
    ],
    "name": "Cut To The Feeling",
    "release_date": "2017-05-26",
    "release_date_precision": "day",
    "total_tracks": 1,
    "type": "album",
    "uri": "spotify:album:0tGPJ0bkWOUmH7MEOR77qc"
  },
  "artists": [
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju"
      },
      "href": "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju",
      "id": "6sFIWsNpZYqfjUpaCgueju",
      "name": "Carly Rae Jepsen",
      "type": "artist",
      "uri": "spotify:artist:6sFIWsNpZYqfjUpaCgueju"
    }
  ],
  "disc_number": 1,
  "duration_ms": 207959,
  "explicit": false,
  "external_ids": {
    "isrc": "USUM71703861"
  },
  "external_urls": {
    "spotify": "https://open.spotify.com/track/6EJiVf7U0p1BBfs0qqeb1f"
  },
  "href": "https://api.spotify.com/v1/tracks/6EJiVf7U0p1BBfs0qqeb1f",
  "id": "6EJiVf7U0p1BBfs0qqeb1f",
  "is_local": false,
  "is_playable": true,
  "linked_from": {
    "external_urls": {
      "spotify": "https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl"
    },
    "href": "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",
    "id": "11dFghVXANMlKmJXsNCbNl",
    "type": "track",
    "uri": "spotify:track:11dFghVXANMlKmJXsNCbNl"
  },
  "name": "Cut To The Feeling",
  "popularity": 69,
  "preview_url": null,
  "track_number": 1,
  "type": "track",
  "uri": "spotify:track:6EJiVf7U0p1BBfs0qqeb1f"
}
*/
