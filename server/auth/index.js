const router = require("express").Router();
const spotifyRouter = require('./spotify');

//and this is where we organize all the routes

router.use('/spotify', spotifyRouter)


module.exports = router;








/*  // Custom middleware to check if the user has been logged in
  const areYouLoggedIn = (req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated"
      });
    } else {
      next();
    }
  };
// if the user is logged in, send the profile response.
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", areYouLoggedIn, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user
  });*/

