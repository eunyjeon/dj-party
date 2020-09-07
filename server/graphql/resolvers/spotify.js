const { withFilter }= require('apollo-server')
const SUGGESTED_TO_QUEUE = 'SUGGESTED_TO_QUEUE'
const DEQUEUED = 'DEQUEUED'
const { PubSub } = require('apollo-server');
const fetch = require("node-fetch")
const sequelize = require('sequelize')

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
        },
        suggestToQueue: async(parent, {roomId, trackUri}, {models, pubSub}) => {
            try {
                await models.Room.update({'queue': sequelize.fn('array_append', sequelize.col('queue'), trackUri)}, {'where': {'id': roomId}})  
                const room = await models.Room.findOne({where: {id: roomId}})
                await pubSub.publish(SUGGESTED_TO_QUEUE, {roomId, suggestedToQueue: room.queue})
                return room.queue
            } catch (error) {
                console.log(error)
            }
        },
        deQueue: async(parent, {roomId, trackUri}, {models, pubSub}) => {
            try {
                // const findRoom = await models.Room.findOne({where: {id: roomId}})
                // findRoom.queue = findRoom.queue.filter((track) => track !== trackUri)
                // await findRoom.save()
                await models.Room.update({'queue':sequelize.fn('array_remove', sequelize.col('queue'), trackUri)}, {'where': {'id': roomId}})
                const room = await models.Room.findOne({where: {id: roomId}})
                await pubSub.publish(DEQUEUED, {roomId, deQueued: room.queue})
                return {trackToPlaylist: trackUri, newQueue: room.queue}
                //trackToPlaylist will be passed down to addSongToPlaylist mutation
            } catch (error) {
                console.log(error)
            }
        }
    }, 
    Subscription: {
        suggestedToQueue: {
            subscribe: withFilter(
                (parent, args, {pubSub}) => pubSub.asyncIterator([SUGGESTED_TO_QUEUE]),
                (payload, variables) => {
                    return payload.roomId === variables.roomId
                }
            )
        },
        deQueued: {
            subscribe: withFilter(
                (parent,args, {pubSub}) => pubSub.asyncIterator([DEQUEUED]), (payload, variables) => {
                    return payload.roomId === variables.roomId
                }
            )
        }
    }
}

module.exports = SpotifyResolver
