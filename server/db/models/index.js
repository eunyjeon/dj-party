const User = require('./user')
const Message = require('./message')
const Room = require('./room')

// add associations

// Message.belongsToMany(User, {through: Room})
// User.belongsToMany(Message, {through: Room})

Message.belongsTo(User)
Message.belongsTo(Room)

User.hasMany(Message)
User.belongsToMany(Room, {through: 'roomUser'})

Room.belongsToMany(User, {through: 'roomUser'})
Room.belongsTo(User, {foreignKey: 'creator'})
Room.hasMany(Message)





module.exports = {
  User,
  Message,
  Room
}
