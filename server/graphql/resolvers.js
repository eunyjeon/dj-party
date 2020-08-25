//what kind of actions should be taken with the data?
//Query ---> GET
//Mutation ---> POST, PUT, DELETE

// const db = require('../db');
// const User = db.models.user
// const Room = db.models.room

//function(root,arg,conmessage,info) root is not necessary for root-level Query. arg is basically parameter. conmessage is authentication etc. info is probs not necessary

//root (result from previous/parent type), args (params), context (obj that's provided to all resolvers), info
//https://www.graphql-tools.com/docs/resolvers/

// module.exports = {
//   Query: {
//     // userPlaylist: (_, argument, { dataSources }) =>
//     // dataSources.playlistAPI.getUserPlaylist(argument.id),
//     // allUser: () => User.findAll(),
//     // baby needs to be added to schema
//     // user: ({id}) => User.findOne({where: id}),
//     // roomInfo: ({id}) => Room.findOne({where: id}, {include: User})
//     roomInfo: ({roomID}) => {
//       Room.findOne({
//         where: {
//           id: roomID
//         },
//         include: {
//           model: User,
//         }
//     })
//     },
//   Mutation: {
//     createRoom: ({userId}) => {const room = await Room.create()
//     room.setUser()},
//     joinRoom, Room.update(where)
//     sendMessage,
//   }
// }


import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub(); //create a PubSub instance
const CHANNEL_ADDED_TOPIC = 'newChannel';
export const resolvers = {
  Query: {
        // userPlaylist: (_, argument, { dataSources }) =>
        // dataSources.playlistAPI.getUserPlaylist(argument.id),
        // allUser: () => User.findAll(),
        // baby needs to be added to schema
        // user: ({id}) => User.findOne({where: id}),
        // roomInfo: ({id}) => Room.findOne({where: id}, {include: User})
        roomInfo: ({roomID}) => {
          Room.findOne({
            where: {
              id: roomID
            },
            include: {
              model: User,
            }
        })
        },
Mutation: {
    addChannel: (root, args) => {  //Create a mutation to add a new channel.
      const newChannel = { id: String(nextId++), messages: [], name: args.name };
      channels.push(newChannel);
      pubsub.publish(CHANNEL_ADDED_TOPIC, { channelAdded: newChannel });  // publish to a topic
      return newChannel;
    }
  },
  Subscription: {
    channelAdded: {  // create a channelAdded subscription resolver function.
      subscribe: () => pubsub.asyncIterator(CHANNEL_ADDED_TOPIC)  // subscribe to changes in a topic
    }
  }
}}
