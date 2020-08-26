// const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  spotifyUsername: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBj5Xh-ofbLiwmbybzplT-WMsm7aqttESolQ&usqp=CAU"
  },
  //maybe need this
  accessToken: Sequelize.STRING,
  proPic: Sequelize.STRING,
  refreshToken: Sequelize.STRING
});

module.exports = User;

/**
 * instanceMethods
 */
// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password();
// };

// /**
//  * classMethods
//  */
// User.generateSalt = function() {
//   return crypto.randomBytes(16).toString("base64");
// };

// User.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash("RSA-SHA256")
//     .update(plainText)
//     .update(salt)
//     .digest("hex");
// };

// /**
//  * hooks
//  */
// const setSaltAndPassword = user => {
//   if (user.changed("password")) {
//     user.salt = User.generateSalt();
//     user.password = User.encryptPassword(user.password(), user.salt());
//   }
// };

// User.beforeCreate(setSaltAndPassword);
// User.beforeUpdate(setSaltAndPassword);
// User.beforeBulkCreate(users => {
//   users.forEach(setSaltAndPassword);
// });
