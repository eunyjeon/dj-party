"use strict";

const { Room, Message, User, RoomUser } = require("../server/db/models/index");
const db = require("../server/db/db")
const { roomSeed, messageSeed, userSeed, roomUserSeed } = require("../seed");


async function seed() {
  try {
    await db.sync({force: true})
    await Promise.all(
      userSeed.map(user => {
        return User.create(user)
      })
    )
    await Promise.all(
      roomSeed.map(room => {
        return Room.create(room)
      })
    )
    await Promise.all(
      roomUserSeed.map(roomUser => {
        return RoomUser.create(roomUser)
      })
    )
    // await Promise.all(
    //   messageSeed.map(message => {
    //     return Message.create(message)
    //   })
    // )
    
    // await Promise.all(sessions.map(session => { return Session.create(session) }));

    console.log('db synced!')
    console.log(`seeded ${userSeed.length} users`)
    console.log(`seeded ${messageSeed.length} messages`)
    console.log(`seeded ${roomSeed.length} room`)
    console.log(`seeded ${roomUserSeed.length} room/user`)
    //console.log(`seeded ${sessions.length} sessions`)
    console.log(`seeded successfully`)
  } catch (err) {
    console.log(err)
  }
}
  // await db.sync();
  // console.log("db synced!");

  // // const users = await Promise.all([User.bulkCreate(userSeed)]);
  // const rooms = await Promise.all([Room.bulkCreate(roomSeed)]);
  // const messages = await Promise.all([Message.bulkCreate(messageSeed)]);
  // const users = await Promise.all([User.bulkCreate(userSeed)])
  // const roomUsers = await Promise.all([RoomUser.bulkCreate(roomUserSeed)])

  // console.log(`seeded rooms and message`);


// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {

  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
