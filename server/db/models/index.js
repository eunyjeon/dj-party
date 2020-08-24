const User = require('./user')
const Message = require('./message')
const Room = require('./room')

// add associations

Message.belongsToMany(User, {through: Room})
User.belongsToMany(Message, {through: Room})

module.exports = {
  User,
  Message,
  Room
}
