
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
            console.log('hi')
            const currentRoom = await models.RoomUser.findOne({where: {activeRoom: true, userId: getUser()}})
            const message = await models.Message.create({...args, userId: getUser(), roomId: currentRoom.roomId})
            if (message) return true;
            else return false;
          } catch (err) {
            console.log(err)
            return false
          }
        },
      }
}

module.exports = messageResolver