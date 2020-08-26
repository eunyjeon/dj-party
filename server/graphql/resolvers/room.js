const roomResolver = {
  // TODO: query getAllRooms
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
