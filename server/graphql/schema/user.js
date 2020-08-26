const { gql } = require('apollo-server')

const user = gql`
    type User {
        id: ID!
        spotifyUsername: String!
        accessToken: String!
        refreshToken: String!
        imageUrl: String
    }

    type Query {
        getUser(roomId: ID!, id: ID!): User!
        getAllUsers(roomId: ID!): [User!]
    }

    


`

module.exports = user


