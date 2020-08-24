//how do we want to see our data?
const { gql } = require('apollo-server-express')

const typeDefs = gql`

## user schema ##
type Query {
  user(id: ID!): User,
  # userPlaylist(user: User): UserPlaylist
  #need to get the playlist by the user
},
type Mutation {
  createPlaylist(name: String!, public: Boolean, collaborative: Boolean): UserPlaylist
},
type User {
  id: ID!,
  spotifyId: String!,
  name: String,
  accessToken: String,
  refreshToken: String,
  playlist: UserPlaylist
},
type UserPlaylist {
  id: ID!,
  name: String,
  tracks: [Track],
  collaborative: Boolean,
  uri: String
},
type Track {
  id: ID!,
  name: String
}

`

module.exports = typeDefs
