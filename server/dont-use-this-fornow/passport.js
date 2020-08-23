const router = require('express').Router()
const User = require("../db/models/user");
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;

module.exports = router
module.exports = SpotifyStrategy

//** this is where we handle the passport middleware stuff **//

router.use(passport.initialize())
router.use(passport.session())

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically, this will be as simple as storing the user ID when serializing, and finding the user by ID when deserializing.

// serialize the user.id to save in the session
// so the browser will remember the user when she's logged in
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the user in the database
passport.deserializeUser(async (id, done) => {
  try {
  const foundUser = await User.findById(id)
  done(null, foundUser);
  } catch (error) {
    console.log("Failed to deserialize the user", error);
  }
});


// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.


passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/spotify/redirect",
      passReqToCallback: true
    },
    async function(accessToken, refreshToken, expires_in, profile, done) {
      // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });
      // find current user in the database
      const currentUser = await User.findOne({
        spotifyId: profile.id
      });
     // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          email: profile.email, //make sure these are the same as spotify
          fullName: profile.displayName,
          spotifyId: profile.id,
          accessToken: accessToken,
          refreshToken: refreshToken
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
 );
//user's info should now be in sessions/database







//router.use(passport.initialize());

// router.get(
//   '/',
//   passport.authenticate('spotify', {
//     scope: [
//       'user-read-email',
//       'user-read-private',
//       'user-modify-playback-state',
//       'streaming',
//       'playlist-read-collaborative',
//       'playlist-modify-public',
//       'playlist-read-private',
//       'playlist-modify-private',
//       'app-remote-control'
//     ]
//    }),
//   function(req, res) {
//     // The request will be redirected to spotify for authentication, so this
//     // function will not be called.
//   }
// );

// router.get(
//   '/callback',
//   passport.authenticate('spotify', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
//   // passport.authenticate('spotify', { failureRedirect: '/login' }),
//   // function(req, res) {
//   //   // Successful authentication, redirect home.
//   //   res.redirect('/')};
// );



