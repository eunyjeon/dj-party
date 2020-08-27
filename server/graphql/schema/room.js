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
<<<<<<< HEAD
        createRoom(name: String, public: Boolean): Boolean!
        joinRoom(id: ID!): Boolean!
=======
        createRoom(name: String, public: Boolean): CreateRoomResponse!
        addUserToRoom(spotifyUsername: String!, roomId: ID!): VoidResponse!
>>>>>>> df79a5fb6cc1db18869c6c57f70a24183ab54b9d
    }
`

module.exports = room
