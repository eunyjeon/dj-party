const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  spotifyUsername: {
    type: Sequelize.STRING,
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBj5Xh-ofbLiwmbybzplT-WMsm7aqttESolQ&usqp=CAU',
  },
  //maybe need this
  accessToken: Sequelize.STRING,
  proPic: Sequelize.STRING,
  refreshToken: Sequelize.STRING,
  currentRoom: {
    type: Sequelize.INTEGER
  }
})

module.exports = User
