
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDEDs';

const messageResolver = {
    Query: {
      getMessages: async (parent, {roomId}, { models }) => { //roomId is args
        try {
          // const messages = await models.Room.
        } catch (err) {
          console.log(`cannot get messages for room: ${roomId}`, err)
        }
      }
    },
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
          try {
            const message = await models.Message.create({...args, userId: user.id})
            //return true
            if (message) {
              await pubsub.publish(MESSAGE_ADDED, {messageAdded: args})
              return true;}
            else return false;
          } catch (err) {
            console.log(err)
            return false
          }
        },
      },
    Subscription: {
      messageAdded: {
          // Additional event labels can be passed to asyncIterator creation
          subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
        },
      },
}

module.exports = messageResolver
