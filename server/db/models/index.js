const User = require('./user')
const Message = require('./message')
const Room = require('./room')
const RoomUser = require('./roomUser')
// add associations

// Message.belongsToMany(User, {through: Room})
// User.belongsToMany(Message, {through: Room})

//create a logic where a user is "active" in a room. User can be in many rooms in this case. OR user belongs to a room


Message.belongsTo(User)
Message.belongsTo(Room)

User.hasMany(Message)
User.belongsToMany(Room, {through: 'RoomUser'})

Room.belongsToMany(User, {through: 'RoomUser'})
Room.belongsTo(User)
Room.hasMany(Message)





module.exports = {
  User,
  Message,
  Room,
  RoomUser
}
