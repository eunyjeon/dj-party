const { gql } = require('apollo-server')

const message = gql`
  type Message {
  id: Int!
  message: String!
  user: User!
  room: Room!
}

type Query {
  getMessages(roomId: Int!): [Message!]
}

type Mutation {
    createMessage(roomId: Int!, message: String!): Boolean!
}

type Subscription {
    messageAdded(id: Int!): Message!
}


`
module.exports= message
