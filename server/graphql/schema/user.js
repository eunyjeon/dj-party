const { gql } = require('apollo-server')

const user = gql`
    type User {
        id: ID
        spotifyUsername: String!
        accessToken: String!
        refreshToken: String!
        imageUrl: String
    }

    type Query {
        getUser(id: ID!): User!
        getAllUsersInRoom(roomId: ID!): [User!]
        me: User!
    }


`

module.exports = user


