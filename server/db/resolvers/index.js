const {User, Room, Message} = require('../models');
//add authentication here;
//resolvers are basically just routes


exports.resolvers = {
  Query: {
  user:  ({userId}) => {User.findOne({where: {id: userId}})},
  room: ({roomId}) => {Room.findOne({where: {id: roomId}})},
  chatsByRoom: async (parent, {id}, {Room}) => {
      await Room.findByPk(id, {include: {Message}})
    },
  usersByRoom: async (parent, {roomId}) => {
    const whichRoom = await Room.findByPk({id: roomId});
    return whichRoom.getUsers();
   }
  },
  Subscription: {
    newChat: 
  }
}
