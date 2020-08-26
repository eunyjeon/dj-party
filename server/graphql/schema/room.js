const { gql } = require('apollo-server')

const room = gql`
    type Room {
        id:ID!
        name: String!
        messages: [Message!]!
        users: [User!]!
        creator: User!
        public: Boolean!
    }

    type Mutation {
        createRoom(name: String, public: Boolean): Boolean!
    }
`

module.exports = room