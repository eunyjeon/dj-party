const { gql } = require('apollo-server')

const user = gql`
    type User {
        id: ID
        spotifyUsername: String!
        accessToken: String!
        refreshToken: String!
        imageUrl: String
    }

    type UserResponse {
        user: User
        gotUser: Boolean
    }

    type Query {
        me: UserResponse!
    }


`

module.exports = user


