const { gql } = require('apollo-server')

const message = gql`
  type Message {
  id: Int!
  message: String!
  user: User
  room: Room
}

type Mutation {
    createMessage(roomId: Int!, message: String!): Boolean!
}

type Query {
    getMessages(roomId: Int!): [Message]
}

`
module.exports= message
