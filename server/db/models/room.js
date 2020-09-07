const Sequelize = require("sequelize");
const db = require("../db");

const Room = db.define("room", {
    name: {
        type: Sequelize.STRING,
    },
    public: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    description: {
        type: Sequelize.STRING,
    },
    playlistId: {
        type: Sequelize.TEXT
    },
    queue: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['spotify:track:6EJiVf7U0p1BBfs0qqeb1f'],
    }
})

module.exports = Room
