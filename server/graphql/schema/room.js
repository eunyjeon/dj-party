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
    }

    type Query {
        getAllRooms: [Room!]!
        getActiveRoom: Room!
        getSingleRoom(roomId: ID!): Room!
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
        createRoom(name: String, public: Boolean): CreateRoomResponse!
        addUserToRoom(spotifyUsername: String!, roomId: ID!): VoidResponse!
        joinRoom(roomId: ID!): VoidResponse!
    }
`

module.exports = room
