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
        me: User!
        # isLoggedIn: Boolean
    }


`

module.exports = user


