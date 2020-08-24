const Sequelize = require("sequelize");
const db = require("../db");

const Room = db.define("room", {
    name: {
        type: Sequelize.STRING,
        defaultValue: `Cool Room ${this.id}`
    }
})

module.exports = Room