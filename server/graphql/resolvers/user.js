const userResolver = {
    Query: {
        me: async (parent, args, {models, getUser}) => {
            try {
                if (getUser()) {
                    const user = await models.User.findOne({where: {id: getUser()}})
                    return { user, gotUser: true}
                } else {
                    return {gotUser: false}
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = userResolver
