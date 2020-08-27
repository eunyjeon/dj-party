const userResolver = {
    Query: {
        getAllUsers: async (parent, {roomId}, {models}) => {
            try {
                const findUser = await models.RoomUser.findOne({
                    where: {roomId},
                    include: {models: models.User}
                })
                return findUser
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = userResolver