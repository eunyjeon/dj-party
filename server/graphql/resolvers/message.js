
const messageResolver = {
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
   Mutation: {
        createMessage: async (parent, args, { models, getUser }) => {
          try {
            const currentRoom = await models.RoomUser.findOne({where: {activeRoom: true, userId: getUser()}})
            console.log("right afer 16 lol")
            const message = await models.Message.create({...args, userId: getUser(), roomId: currentRoom.roomId})
            console.log("message being returned from createMessage resolver", message)
            // if (message) return true;
            // else return false;
            return message;
          } catch (err) {
            console.log(err)
            return {ok: false, error: 'Something went wrong!'}
          }
        },
  }
}

module.exports = messageResolver
