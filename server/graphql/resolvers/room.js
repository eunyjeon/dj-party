//still trying to decide if we need activeRoom in roomUsers, since there a currentRoom in Users
const roomResolver = {
    Room: {
      users: async ({id}, args, {models}) => {
        try {
          const users = await models.User.findAll({where: {currentRoom: id}})
          return users
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
      //below is distinguishing between public and private, not sure if we need, but it might be helpful to have it split...
      //can get rid of this later
      getPublicRooms: async (parent, args, {models}) => {
        try {
          //We need to consider that we cannot just render all the rooms, but only the public ones and the private ones a user either created or is invited to 
          const publicRooms = await models.Room.findAll({where: {public:true}})
          return publicRooms
        } catch (error) {
          console.log("cannot get all the rooms!", error)
        }
      },
      getPrivateRooms: async (parent, args, {models}) => {
        try {
          //when a user is invited to a room, instance in RoomUser for the user is added
          //when a user creates a room, an instance is also created in RoomUser
          //so this will return any private rooms the user creates and any ones they are invited to
          const privateRooms = await models.RoomUser.findAll({where: {userId: getUser()}})
          return privateRooms
        } catch (error) {
          console.log("cannot get all the rooms!", error)
        }
      },
      getSingleRoom: async (parent, {roomId}, {models}) => {
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
          await models.User.update({currentRoom: room.id})
          return {ok: true, roomMade: room}
        } catch (err) {
          console.log(err)
          return {ok: false, error: 'Something went wrong!'}
        }
      },
      addUserToRoom: async (parent, {spotifyUsername, roomId}, {models, getUser}) => {
        //only creators can add users to their active room
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
        try {
                   //need to figure out public/private
          //thinking we check if it is public or not
          //if public, then they can join and automatically current room updates
          //if private, it'll be linked to their friend
          //when a user's friend makes a room, a roomUser instance is made for the user
          // const roomToJoin = await models.Room.findOne({where: {id: roomId}})
          const currentUser = await models.User.findOne({where: {id: getUser()}})
          // if (roomToJoin.public){
          console.log(getUser(), 'context')
          await currentUser.update({currentRoom: roomId})
          //   return {ok:true}
          // } else {
          //   const accessToPrivate = await models.RoomUser.findOne({where: {roomId, userId: getUser()}})
          //   if(accessToPrivate){
          //     await currentUser.update({currentRoom: roomId})
          //     return {ok: true}
          //   }
          // return {ok:false}
          // //find the room that they are currently in and switch activeRoom to be false
          const roomUser = await models.RoomUser.findOne({where: {activeRoom: true, userId: getUser()}})
          if (roomUser){
            await roomUser.update({activeRoom:false})
          }
          // //now check to see if that user has already been in the room they want to join
          // //if so, find that instance and update activeRoom to true
          // //if not, create an instance in roomUser for that user and room
          const roomUserToJoin = await models.RoomUser.findOne({where: {userId: getUser(), roomId}})
          if (roomUserToJoin){
            roomUserToJoin.update({activeRoom:true})
            return {ok: true}
          } else {
            await models.RoomUser.create({where: {isCreator: false, activeRoom: true, userId: getUser(), roomId}})
            return {ok: true}
          }
        } catch (error) {
          console.log(error)
          return {ok: false}
        }
      }
    }
  }

module.exports = roomResolver
