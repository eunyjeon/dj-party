const userResolver = {
    Query: {
        // me: async (parent, args, {models, getUser}) => {
        //     try {
        //         if (getUser()) {
        //             const user = await models.User.findOne({where: {id: getUser()}})
        //             return user
        //         } else {
        //             return "NOT_FOUND"
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        // },
        me: async (parent, args, {models, getUser}) => {
            try {
                const user = await models.User.findOne({where: {id: getUser()}})
                return user
            } catch (error) {
                console.log(error)
            }
        },
    }
}

module.exports = userResolver
