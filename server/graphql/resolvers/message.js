
const messageResolver = {
<<<<<<< HEAD
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
=======
  Message: {
    user: async (parent, args, {models, getUser}) => {
      try {
        const user = await models.User.findOne({where: {id: getUser()}})
        return user
      } catch (error) {
        console.log(error)
      }
    }
  },
>>>>>>> c5d4a580af8ef614b8271d461cf97b741b68b437
    Mutation: {
        createMessage: async (parent, args, { models, getUser }) => {
          try {
<<<<<<< HEAD
            const message = await models.Message.create({...args, userId: user.id})
            if (message) return {ok: true, messageMade: message};
=======
            console.log('hi')
            const currentRoom = await models.RoomUser.findOne({where: {activeRoom: true, userId: getUser()}})
            const message = await models.Message.create({...args, userId: getUser(), roomId: currentRoom.roomId})
            if (message) return true;
>>>>>>> c5d4a580af8ef614b8271d461cf97b741b68b437
            else return false;
          } catch (err) {
            console.log(err)
            return {ok: false, error: 'Something went wrong!'}
          }
        },
      }
}

module.exports = messageResolver
