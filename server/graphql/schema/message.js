const { gql } = require('apollo-server')

const message = gql`
  type Message {
  id: Int
  message: String!}

type Mutation {
    createMessage(message: String!): Boolean!
}

type Query {
    getMessages(roomId: Int!): [Message]
}

`
module.exports= message
