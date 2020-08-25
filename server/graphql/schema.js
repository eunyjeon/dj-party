//how do we want to see our data?
const { gql } = require('apollo-server-express')

const typeDefs = gql`


scalar Timestamp

union Room = User | Message

type Query {
  user(id: ID!): User,
  # userPlaylist(user: User): UserPlaylist
  # need to get the playlist by the user
  #Finding room info to get messages and users
  roomInfo(id: ID!) : Room,
  messages(room: Room): Message,
  usersInARoom(room: Room): [User],
},
type Mutation {
  createPlaylist(name: String!, public: Boolean, collaborative: Boolean): UserPlaylist
  createRoom(name: String!, creator: String) : Room
  sendMessage(text: String!, user: String): Message
},
type User {
  id: ID!,
  spotifyId: String!,
  name: String,
  accessToken: String,
  refreshToken: String,
  playlist: UserPlaylist,
  messages: [Message]
},
type Message {
  id: ID!,
  message: String!,
  user: Int!,
  createdAt: Timestamp!
},
type Room {
  id: ID!,
  creator: User,
  message: [Message],
  name: String,
  createdAt: Timestamp!
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
