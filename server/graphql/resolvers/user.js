const userResolver = {
    Query: {
        getUser: (parent, {id}, {models}) => models.User.findOne({where: {id}}),
        getAllUsers: (parent, args, {models}) => models.User.findAll()
    },

}

module.exports = userResolver