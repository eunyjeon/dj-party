const userResolver = {
    Query: {
        me: async (parent, args, {models, getUser}) => {
            try {
                const user = await models.User.findOne({where: {id: getUser()}})
                return user
            } catch (error) {
                console.log(error)
            }
        },
        //TODO: for checking the current user is guest or loggedin
        //TODO: delete if not used (also delete the typedef)
        // isLoggedIn: (parent, args, {getUser}) => {
        //     const userId = getUser()
        //    if (userId) {
        //        return true
        //    } else {
        //        false
        //    }
        // }
    }
}

module.exports = userResolver
