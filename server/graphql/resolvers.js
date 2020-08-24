//what kind of actions should be taken with the data?
//Query ---> GET
//Mutation ---> POST, PUT, DELETE

const db = require('../db');
const User = db.models.user
const Room = db.models.room

//function(root,arg,conmessage,info) root is not necessary for root-level Query. arg is basically parameter. conmessage is authentication etc. info is probs not necessary
//https://www.graphql-tools.com/docs/resolvers/

module.exports = {
  Query: {
    // userPlaylist: (_, argument, { dataSources }) =>
    // dataSources.playlistAPI.getUserPlaylist(argument.id),
    // allUser: () => User.findAll(),
    // baby needs to be added to schema
    user: ({id}) => User.findOne({where: id}),
    roomInfo: ({id}) => Room.findOne({where: id}, {include: User})
  },
  Mutation: {
    // createRoom (userId) = Room.Create({where:userId}),
    // joinRoom, Room.update(where)
    // sendMessage,
  }
}


