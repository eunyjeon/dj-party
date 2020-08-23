/*

//put all the spotify stuff here
const router = require("express").Router();
const passport = require('passport');
const User = require("../db/models/user");


//maybe change to graphql once you get this working lmao?

//and this is where we set up the auth routes

//module.exports = router; //maybe i need to organize this better
*/

 /**
 *
 * The Spotify authentication strategy authenticates requests by delegating to
 * Spotify using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Spotify application's app key
 *   - `clientSecret`  your Spotify application's app secret
 *   - `callbackURL`   URL to which Spotify will redirect the user
 *                     after granting authorization
 *   - `scope`         [Optional] An array of named scopes containing:
 *                     "user-read-private" if you want to request user's private
 *                     information such as display name and display picture url
 *                     "user-read-email" if you want to request user's email
 **/

 /*The following code generates a request for the scopes user-read-private and user-read-email:

app.get('/login', function(req, res) {
var scopes = 'user-read-private user-read-email';
res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + my_client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
});*/

 //user login page aka GET /auth/spotify
router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'user-modify-playback-state',
      'streaming',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-read-private',
      'playlist-modify-private',
      'app-remote-control'
    ],
    showDialog: true
   }),
  function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

// when login is successful, retrieve user info. If not, redirect them to the login page aka GET /auth/spotify/callback
router.get("/spotify/callback", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully logged in via Spotify",
      user: req.user
    });
  }
});

// //when the user logs out, destroy the session and redirect to homepage
// router.get("/logout", (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.redirect("/");
// });





//maybe in the future for individual user profile?
// router.get("/me", (req, res) => {
//   console.log("req.user /me: ", req.user);
//   res.json(req.user);
// });


// router.use("/spotify", require("./spotify"));
