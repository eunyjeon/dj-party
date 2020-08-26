
const messageResolver = {
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
          try {
            const message = await models.Message.create({...args, userId: user.id})
            //return true
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