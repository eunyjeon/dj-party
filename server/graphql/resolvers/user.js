const userResolver = {
    Query: {
        me: async (parent, args, {models, getUser}) => {
            try {
                const user = await models.User.findOne({where: {id: getUser()}})
                return user
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = userResolver