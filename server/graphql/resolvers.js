//what kind of actions should be taken with the data?
//Query ---> GET
//Mutation ---> POST, PUT, DELETE

const db = require('../db');
const User = db.models.user

//function(root,arg,context,info) root is not necessary for root-level Query. arg is basically parameter. context is authentication etc. info is probs not necessary
//https://www.graphql-tools.com/docs/resolvers/

module.exports = {
  Query: {
    userPlaylist: (_, argument, { dataSources }) =>
    dataSources.playlistAPI.getUsersPlaylist(argument.id),
    allUsers: () => User.findAll(),
    user: ({id}) => User.findOne({where: id})
  },
  // Mutation: {

  // }
}
