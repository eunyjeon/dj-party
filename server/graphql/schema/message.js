const { gql } = require('apollo-server')

const message = gql`
  type Message {
  id: Int
  message: String!
  user: User!
  room: Room
}


type Mutation {
    createMessage(message: String!): Boolean!
}


`
module.exports= message
