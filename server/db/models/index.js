const User = require('./user')
const Message = require('./message')
const Room = require('./room')
const RoomUser = require('./roomUser')


Message.belongsTo(User)
Message.belongsTo(Room)

User.hasMany(Message)
User.belongsToMany(Room, {through: RoomUser})

Room.belongsToMany(User, {through: RoomUser})
Room.belongsTo(User)
Room.hasMany(Message)





module.exports = {
  User,
  Message,
  Room,
  RoomUser
}
