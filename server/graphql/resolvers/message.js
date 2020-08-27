
const messageResolver = {
    // Message: {
    //   user: async (parent, args, { models }) => {
    //     console.log("getting them users")
    //     try {
    //       user(parent) {
    //         return {

    //         }
    //       }
    //       //const currentUser = models.User.findOne({where: {id: user.id}})
    //       return { user }
    //     } catch (err) {
    //       console.log("cannot get the user", err)
    //     }
    //   }
    // },
    Query: {
      getMessages: async (parent, {roomId}, { models }) => {
        console.log("messages query")
        try {
          const messages = await models.Message.findAll({where: { roomId: roomId }})
          return messages
        } catch (error) {
          console.log(`cannot get messages for room:${roomId}`, error)
        }
      },
    },
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
          try {
            const message = await models.Message.create({...args, userId: user.id})
            if (message) return {ok: true, messageMade: message};
            else return false;
          } catch (err) {
            console.log(err)
            return {ok: false, error: 'Something went wrong!'}
          }
        },
      }
}

module.exports = messageResolver
