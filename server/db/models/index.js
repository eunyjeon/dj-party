const User = require('./user')
const Message = require('./message')
const Room = require('./room')

// add associations

// Message.belongsToMany(User, {through: Room})
// User.belongsToMany(Message, {through: Room})

Message.belongsTo(User)
User.hasMany(Message)
Room.hasMany(User)
User.belongsTo(Room)
Room.hasMany(Message)
Message.belongsTo(Room)

module.exports = {
  User,
  Message,
  Room
}
