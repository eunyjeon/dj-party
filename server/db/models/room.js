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
    }
})

module.exports = Room
