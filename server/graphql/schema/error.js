const { gql } = require('apollo-server')

const errorMessage = gql`
type Error {
    path: String
    message: String
  }

`
module.exports= errorMessage