
const roomResolver = {
    Room: {
      users: async ({id}, args, {models}) => {
        try {
          const room = await models.Room.findOne({where:{id}})
          return room.getUsers()
        } catch (error) {
          console.log(error)
        }
      }, 
      messages: async ({id}, args, {models}) => {
        try {
          const messages = await models.Message.findAll({where: {roomId: id}})
          return messages
        } catch (error) {
          console.log(error)
        }
      }
    },
    
    Query: {
      getAllRooms: async (parent, args, {models}) => {
        try {
          const rooms = await models.Room.findAll({include: {model: models.Message}})
          return rooms
        } catch (error) {
          console.log("cannot get all the rooms!", error)
        }
      },
      getActiveRoom: async (parent, args, {models, getUser}) => {
        try {
          //if set to active room is true, then maybe that's how we'll get the single room view?
          //Then we don't need roomId?
          const room = await models.RoomUser.findOne({where: {userId: getUser(), activeRoom: true}}, {
            include: {
              model: models.User
            }
          })
          return room
        } catch (error) {
          console.log(`cannot get room: ${id}`,error)
        }
      },
      getSingleRoom: async (parent, {roomId}, {models}) => {
        //still need to test this one
        try {
          const room = await models.Room.findOne({where: {id: roomId}})
          return room
        } catch (error) {
          console.log("cannot get all the rooms!", error)
        }
      }
    },

    Mutation: {
      createRoom: async (parent, args, { models, getUser }) => {
        //have to edit to restrict for unique names
        //when user creates a room, must make sure that everytime they create a room, they logout of their current room
        try {
          const findCurrentRoom = await models.RoomUser.findOne({where: {activeRoom: true, userId: getUser()}})
          if (findCurrentRoom){
            await findCurrentRoom.update({activeRoom: false})
          }
          const room = await models.Room.create({...args, userId: getUser()})
          await models.RoomUser.create({
            roomId: room.id, userId: getUser(), isCreator: true, activeRoom: true
          })
          return {ok: true, roomMade: room}
        } catch (err) {
          console.log(err)
          return {ok: false, error: 'Something went wrong!'}
        }
      },
      addUserToRoom: async (parent, {spotifyUsername, roomId}, {models, getUser}) => {
        try {
          const creatorUserPromise = models.RoomUser.findOne({where: {roomId, userId: getUser(), activeRoom: true}})
          const addToRoomUserPromise = models.User.findOne({where: {spotifyUsername}})
          const [creatorUser, addToRoomUser] = await Promise.all([creatorUserPromise, addToRoomUserPromise])
          
          if(!creatorUser.isCreator){
            return {
              ok: false,
              error: 'Nope! You cannot add users to the room!' 
            }
          }
          
          if(!addToRoomUser){
            return {
              ok: false,
              error: 'Cannot find user with this spotifyUsername!' 
            }
          }

          await models.RoomUser.create({userId: addToRoomUser.id, roomId})
          return{
            ok: true
          }
        } catch (error) {
          console.log(err)
          return{
            ok: false,
            error: 'Something went wrong!'
          }
        }
      },
      joinRoom: async (parent, {roomId}, {models, getUser}) => {
        //still not working
        try {
          const roomUser = await models.RoomUser.findOne({where: {activeRoom: true, userId: getUser()}})
          if (roomUser){
            await roomUser.update({activeRoom:false})
          }
          // roomUser.delete()
          await models.RoomUser.Create({isCreator: false, activeRoom: true, userId: getUser(), roomId})
          return {ok: true}
        } catch (error) {
          console.log(error)
          return {ok: false}
        }
      }
    }
  }

module.exports = roomResolver
