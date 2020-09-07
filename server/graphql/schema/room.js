const { gql } = require('apollo-server')

// TODO: query getAllRooms

const room = gql`
    type Room {
        id:ID!
        name: String!
        messages: [Message!]
        users: [User!]
        isCreator: Boolean
        public: Boolean!
        description: String
        playlistId: String
    }

    type Query {
        getAllRooms: [Room!]!
        getSingleRoom(roomId: ID!): Room!
        getPublicRooms: [Room!]!
        getPrivateRooms: [Room!]!
    }

    type CreateRoomResponse {
        ok: Boolean!
        roomMade: Room
        error: String
    }

    type VoidResponse {
        ok: Boolean!
        error: String
    }

    type Mutation {
        createRoom(name: String!, description: String, public: Boolean): CreateRoomResponse!
        addUserToRoom(spotifyUsername: String!, roomId: ID!): VoidResponse!
        joinRoom(roomId: ID!): VoidResponse!
        leaveRoom: VoidResponse!
    }

    type Subscription {
        userLeft: Boolean
        userJoin: Boolean
    }
`

module.exports = room
