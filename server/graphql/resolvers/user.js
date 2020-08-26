const userResolver = {
    Query: {
        getAllUsers: (parent, {roomId}, {models}) => {
            try {
                const findUser = models.Room.findOne({
                    where: {id: roomId},
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