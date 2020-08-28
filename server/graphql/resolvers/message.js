
const messageResolver = {
    Mutation: {
        createMessage: async (parent, args, { models, getUser }) => {
          try {
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