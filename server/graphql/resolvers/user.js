const userResolver = {
    Query: {
        getAllUsersInRoom: async (parent, {roomId}, {models}) => {
            try {
                const findUser = await models.RoomUser.findOne({
                    where: {roomId},
                    include: {models: models.User}
                })
                return findUser
            } catch (error) {
                console.log(error)
            }
        }, 
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