const fetch = require("node-fetch")
const SpotifyResolver = {
    Query: {
        getPlaylist: async (parent, {playlistId}, {models, getUser}) => {
            try {
                const currUser = await models.User.findOne({where: {id: getUser()}})
                const accessToken = currUser.accessToken
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                })
                const data = await response.json()
                console.log('data:',data)
                console.log('THIS IS THE tracks:\n',data.tracks.items)
                const arrOfTracks = data.tracks.items.reduce((accum, track) => {
                    const trackObj = {
                        id: track.track.id,
                        name: track.track.name,
                        uri: track.track.uri,
                        duration_ms: track.track.duration_ms,
                        artists: track.track.artists,
                        album: track.track.album
                    }
                    accum.push(trackObj)
                    return accum
                },[])
                console.log(arrOfTracks, 'arrOfTRACkS')
                return {
                    description: data.description,
                    id: data.id,
                    tracks: arrOfTracks,
                    uri: data.uri
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation: {
        createPlaylist: async (parent, {name, description, roomId}, {models, getUser}) => {
            try {
            const currUser = await models.User.findOne({where: {id: getUser()}})
            const userId = currUser.spotifyUsername
            const accessToken = currUser.accessToken
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "description" : description,
                    "public": false,
                    "collaborative": true
                })
            })
            const data = await response.json()
            console.log(data)
            if (data){
                const playlistId = data.id
                const findRoom = await models.Room.findOne({where: {id: roomId}})
                findRoom.update({playlistId})
                return true
            }
            } catch (error) {
                console.log(error)
                return false
            }
        },
        addSongToPlaylist: async (parent, {roomId, playlistId, trackUri}, {models, getUser}) => {
            try {
                const currUser = await models.User.findOne({where: {id: getUser()}})
                const accessToken = currUser.accessToken
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uris: [trackUri]
                    })
                })
                const data = await response.json()
                console.log("data: ", data)
                if (data){
                    return true
                }
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
}

module.exports = SpotifyResolver
