const router = require('express').Router()
const User = require("../db/models/user");
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;
module.exports = router
console.log("hello")
passport.use(
  new SpotifyStrategy(
    {
      clientID: '0c88d555ef3c4410bf6f4cb02793199f',
      clientSecret: '4ee19343e83e496aa1723ba7008fbe7f',
      callbackURL: "https://www.google.com/"
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);

router.get(
  '/',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private'
      // 'user-modify-playback-state',
      // 'streaming',
      // 'playlist-read-collaborative',
      // 'playlist-modify-public',
      // 'playlist-read-private',
      // 'playlist-modify-private',
      // 'app-remote-control'
    ]
   }),
  function(req, res) {
    console.log("OK: in function")
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

router.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
