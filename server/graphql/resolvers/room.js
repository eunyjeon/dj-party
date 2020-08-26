const roomResolver = {
    Query: {
      getAllRooms: async (parent, args, {models}) => {
        try {
          const rooms = await models.Room.findAll()
          return rooms
        } catch (error) {
          console.log(error)
        }
      },
      getRoom: async (parent, {id}, {models}) => {
        try {
          const room = await models.Room.findOne({where: {id}})
          return room
        } catch (error) {
          console.log(error)
        }
      }
    },
    Mutation: {
      createRoom: async (parent, args, { models, user }) => {
        try {
          await models.Room.create({...args, creator: user.id});
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      },
    },
  }

module.exports = roomResolver