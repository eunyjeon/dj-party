
const roomResolver = {
    
    Query: {
      getAllRooms: async (parent, args, {models}) => {
        try {
          const rooms = await models.Room.findAll({include: {model: models.Message}})
          return rooms
        } catch (error) {
          console.log("cannot get all the rooms!", error)
        }
      },
      getActiveRoom: async (parent, args, {models, user}) => {
        try {
          //if set to active room is true, then maybe that's how we'll get the single room view?
          //Then we don't need roomId?
          const room = await models.RoomUser.findOne({where: {userId: user.id, activeRoom: true}}, {
            include: {
              model: models.User
            }
          })
          return room
        } catch (error) {
          console.log(`cannot get room: ${id}`,error)
        }
      }
    },
    Mutation: {
      createRoom: async (parent, args, { models, user }) => {
        try {
          const room = await models.Room.create({...args, userId: user.id})
          await models.RoomUser.create({
            roomId: room.id, userId: user.id, isCreator: true
          })
          return {ok: true, roomMade: room}
        } catch (err) {
          console.log(err)
          return {ok: false, error: 'Something went wrong!'}
        }
      },
      addUserToRoom: async (parent, {spotifyUsername, roomId}, {models, user}) => {
        try {
          const creatorUserPromise = models.RoomUser.findOne({where: {roomId, userId: user.id, activeRoom: true}})
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
      }
    }
  }

module.exports = roomResolver