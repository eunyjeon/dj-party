
const messageResolver = {
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
          try {
            const message = await models.Message.create({...args, userId: user.id})
            return true
          } catch (err) {
            console.log(err)
            return false
          }
        },
      }
}

module.exports = messageResolver