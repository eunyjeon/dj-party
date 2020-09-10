const { withFilter }= require('apollo-server')
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const messageResolver = {
  Message: {
    user: async ({id}, args, {models}) => {
      try {
        const message = await models.Message.findOne({where: {id}})
        const user = await models.User.findOne({where:{id: message.userId}})
        return user
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    createMessage: async (parent, args, { models, pubSub, getUser }) => {
      try {
        const message = await models.Message.create({...args, userId: getUser()})
        await pubSub.publish(MESSAGE_CREATED, {roomId: args.roomId, messageCreated: message})
        return message;
      } catch (err) {
        console.log(err)
        return {ok: false, error: 'Something went wrong!'}
      }
    }
  },
  Subscription: {
      messageCreated: {
        subscribe: withFilter(
          (parent, args, {pubSub}) => pubSub.asyncIterator([MESSAGE_CREATED]),
                (payload, variables) => {
                        return payload.roomId === variables.roomId;
                    }),
      },
  }
}

module.exports = messageResolver
