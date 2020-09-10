const { withFilter }= require('apollo-server')
const USER_LEFT = 'USER_LEFT'
const USER_JOIN = 'USER_JOIN'


const roomResolver = {
  Room: {
    users: async ({ id }, args, { models }) => {
      try {
        const users = await models.User.findAll({ where: { currentRoom: id } })
        return users
      } catch (error) {
        console.log(error)
      }
    },
    messages: async ({ id }, args, { models }) => {
      try {
        const messages = await models.Message.findAll({ where: { roomId: id } })
        return messages
      } catch (error) {
        console.log(error)
      }
    },
  },

  Query: {
    getAllRooms: async (parent, args, { models }) => {
      try {
        const rooms = await models.Room.findAll()
        return rooms
      } catch (error) {
        console.log('cannot get all the rooms!', error)
      }
    },
    getSingleRoom: async (parent, { roomId }, { models }) => {
      try {
        const room = await models.Room.findOne({ where: { id: roomId } })
        return room
      } catch (error) {
        console.log('cannot get all the rooms!', error)
      }
    },
  },
  Mutation: {
    createRoom: async (parent, args, { models, getUser }) => {
      try {
        const room = await models.Room.create({ ...args, userId: getUser() })
        await models.RoomUser.create({
          roomId: room.id,
          userId: getUser(),
          isCreator: true,
          activeRoom: true,
        })
        const currUser = await models.User.findOne({where: {id: getUser()}})
        await currUser.update({ currentRoom: room.id })
        return { ok: true, roomMade: room }
      } catch (err) {
        console.log(err)
        return { ok: false, error: 'Something went wrong!' }
      }
    },
    joinRoom: async (parent, { roomId }, { models, getUser, pubSub }) => {
      try {
        const currentUser = await models.User.findOne({
          where: { id: getUser() },
        })
          await currentUser.update({ currentRoom: roomId })
          const newUsers = await models.User.findAll({where: {currentRoom: roomId}})
          await pubSub.publish(USER_JOIN, {roomId, userJoin: newUsers})
          return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    leaveRoom: async (parent, {roomId}, {models, getUser, pubSub}) => {
      try {
        const currUser = await models.User.findOne({where: {id: getUser()}})
        currUser.update({currentRoom: null})
        const newUsers = await models.User.findAll({where: {currentRoom: roomId}})
        await pubSub.publish(USER_LEFT, {roomId, userLeft: newUsers})
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }, 
  Subscription: {
    userLeft: {
      subscribe: withFilter(
          (parent, args, {pubSub}) => pubSub.asyncIterator([USER_LEFT]),
          (payload, variables) => {
              return payload.roomId === variables.roomId
          }
      )
  },
    userJoin: {
      subscribe: withFilter(
          (parent, args, {pubSub}) => pubSub.asyncIterator([USER_JOIN]),
          (payload, variables) => {
              return payload.roomId === variables.roomId
          }
      )},
    }
}

module.exports = roomResolver
