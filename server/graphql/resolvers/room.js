const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
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
    //below is distinguishing between public and private, not sure if we need, but it might be helpful to have it split...
    //can get rid of this later
    getPublicRooms: async (parent, args, { models }) => {
      try {
        //We need to consider that we cannot just render all the rooms, but only the public ones and the private ones a user either created or is invited to
        const publicRooms = await models.Room.findAll({
          where: { public: true },
        })
        return publicRooms
      } catch (error) {
        console.log('cannot get all the rooms!', error)
      }
    },
    //haven't set private/public up in the frontend yet
    getPrivateRooms: async (parent, args, { models }) => {
      try {
        //RoomUser now only used for when users invite other users to their private rooms
        //when a user is invited to a room, instance in RoomUser for the user is added
        //when a user creates a room, an instance is also created in RoomUser
        //so this will return any private rooms the user creates and any ones they are invited to
        const privateRooms = await models.RoomUser.findAll({
          where: { userId: getUser() },
        })
        return privateRooms
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
      //have to edit to restrict for unique names
      //when user creates a room, must make sure that everytime they create a room, they logout of their current room
      try {
        const room = await models.Room.create({ ...args, userId: getUser() })
        await models.RoomUser.create({
          roomId: room.id,
          userId: getUser(),
          isCreator: true,
          activeRoom: true,
        })
        await models.User.update({ currentRoom: room.id })
        return { ok: true, roomMade: room }
      } catch (err) {
        console.log(err)
        return { ok: false, error: 'Something went wrong!' }
      }
    },
    addUserToRoom: async (
      parent,
      { spotifyUsername, roomId },
      { models, getUser }
    ) => {
      //only creators can add users to their active room
      try {
        const creatorUserPromise = models.RoomUser.findOne({
          where: { roomId, userId: getUser() },
        })
        const addToRoomUserPromise = models.User.findOne({
          where: { spotifyUsername },
        })
        const [creatorUser, addToRoomUser] = await Promise.all([
          creatorUserPromise,
          addToRoomUserPromise,
        ])

        if (!creatorUser.isCreator) {
          return {
            ok: false,
            error: 'Nope! You cannot add users to the room!',
          }
        }

        if (!addToRoomUser) {
          return {
            ok: false,
            error: 'Cannot find user with this spotifyUsername!',
          }
        }

        await models.RoomUser.create({ userId: addToRoomUser.id, roomId })
        return {
          ok: true,
        }
      } catch (error) {
        console.log(error)
        return {
          ok: false,
          error: 'Something went wrong!',
        }
      }
    },
    joinRoom: async (parent, { roomId }, { models, getUser, pubSub }) => {
      try {
        const roomToJoin = await models.Room.findOne({ where: { id: roomId } })
        const currentUser = await models.User.findOne({
          where: { id: getUser() },
        })
        if (roomToJoin.public) {
          await currentUser.update({ currentRoom: roomId })
          return { ok: true }
        } else {
          const accessToPrivate = await models.RoomUser.findOne({
            where: { roomId, userId: getUser() },
          })
          if (accessToPrivate) {
            await currentUser.update({ currentRoom: roomId })
            return { ok: true }
          }
        }
        return { ok: false }
      } catch (error) {
        console.log(error)
        return { ok: false }
      }
    },
    leaveRoom: async (parent, args, {models, getUser, pubSub}) => {
      try {
        const currUser = await models.User.findOne({where: {id: getUser()}})
        currUser.update({currentRoom: null})
        await pubSub.publish(USER_LEFT, {ok:true})
        return {ok: true}
      } catch (error) {
        console.log(error)
      }
    }
  }, 
  Subscription: {
    userLeft: {
      subscribe: (parent, args, {pubSub}) => pubSub.asyncIterator([USER_LEFT]),
    },
    userJoin: {
      subscribe: (parent, args, {pubSub}) => pubSub.asyncIterator([USER_JOIN])
    }
  }
}

module.exports = roomResolver
