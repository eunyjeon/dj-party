const { gql } = require('apollo-server-express')


const typeDefs = gql`
  type Query {
  chatsByRoom(roomId: ID!): [Message!],
  me: User!, #for auth purposes
  usersByRoom: [User!]!,
  user(id: ID!): User
  },

  type Subscription {
    newChat(roomId: ID!): Message!
  },

  type Message {
  id: ID!,
  content: String!,
  #createdAt: TimeStamp!,
  author: User!,
  room: Room!
  },

  type Room {
  id: ID!,
  creator: User,
  message: [Message],
  name: String,
  #createdAt: Timestamp!
  },

  type User {
    id: ID!,
    spotifyId: String!,
    name: String,
    accessToken: String,
    refreshToken: String,
    messages: [Message]
  },

`
module.exports = typeDefs
