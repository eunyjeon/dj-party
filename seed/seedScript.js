"use strict";

const { Room } = require("../server/db/models/index");
const db = require("../server/db/db")
const { roomSeed } = require("../seed");


async function seed() {
  try {
    await db.sync({force: true})
    await Promise.all(
      roomSeed.map(room => {
        return Room.create(room)
      })
    )


    console.log('db synced!')
    console.log(`seeded ${roomSeed.length} room`)
    console.log(`seeded successfully`)
  } catch (err) {
    console.log(err)
  }
}
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

if (module === require.main) {
  runSeed();
}

module.exports = seed;
