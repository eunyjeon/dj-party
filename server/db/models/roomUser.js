const Sequelize = require("sequelize");
const db = require("../db");

const RoomUser = db.define("roomUser", {
    activeRoom: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    isCreator: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = RoomUser