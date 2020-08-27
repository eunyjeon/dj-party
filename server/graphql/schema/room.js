const { gql } = require('apollo-server')

// TODO: query getAllRooms

const room = gql`
    type Room {
        id:ID!
        name: String!
        messages: [Message!]!
        users: [User!]!
        creator: User!
        public: Boolean!
        description: String
    }

    type Query {
        getAllRooms: [Room!]!
        getRoom(id: ID!, name: String): Room!
    }

    type Mutation {
        createRoom(name: String, public: Boolean): Boolean!
        joinRoom(id: ID!): Boolean!
    }
`

module.exports = room
