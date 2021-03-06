const { gql } = require('apollo-server')

const message = gql`
  type Message {
  id: Int
  message: String!
  user: User!
  room: Room
}

type Query {
  getMessages(roomId: Int!): [Message!]
}

type Mutation {
    createMessage(roomId: ID, message: String!  ): Message!
}

type Subscription {
  messageCreated(roomId: ID!): Message!
}

`
module.exports= message
