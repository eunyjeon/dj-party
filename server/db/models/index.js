const User = require('./user')
const Room = require('./room')


Room.hasMany(User)
User.belongsTo(Room)

module.exports = {
  User,
  Room
}
