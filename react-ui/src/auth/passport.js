const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;
const router = require('express').Router();

//hide this!
const appKey = "c5c547bf5c2d453aa62e517f14bc471a"
const appSecret = "dc3b70f0b06b4c52b35065b9d233e259"

router.use(passport.initialize())
router.use(passport.session())

//need to serialize and deserialize to make sure login sessions persist
passport.serializeUser((user, done) => {
  done(null, user.id)
})

//usually we would use id as a parameter instead, but no database sadly.
passport.deserializeUser((obj, done) => {
  // User.findById(id)
  //   .then(user => done(null, user))
  //   .catch(done)
  done(null, obj)
})

passport.use(
  new SpotifyStrategy(
    {
      clientID: appKey,
      clientSecret: appSecret,
      callbackURL: 'http://localhost:3000/callback/'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function () {
        console.log('Profile: ', profile)
        return done(null, profile);
      })
      //need to insert user model here. This is to associate the spotify account with a user in the database and return that user instead. Since I don't have a database right now, I'll just return the entire Spotify profile.
    }
  )
);

module.exports = router
