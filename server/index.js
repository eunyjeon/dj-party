const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const db = require("./db");

//natalie add-ons
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const morgan = require('morgan')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const bodyParser = require('body-parser')
const SpotifyStrategy = require('./passport-spotify/index').Strategy;
const sessionStore = new SequelizeStore({db})

const isDev = process.env.NODE_ENV !== 'production';
// if (isDev) require("../secrets")
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  const appKey = '0c88d555ef3c4410bf6f4cb02793199f'
  const appSecret = '4ee19343e83e496aa1723ba7008fbe7f'

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  // Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and spotify
//   profile), and invoke a callback with a user object.
  passport.use(new SpotifyStrategy({
    clientID: appKey,
    clientSecret: appSecret,
    callbackURL: 'https://www.google.com/'
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        console.log('Profile: ', profile)

        db.models.user.findOrCreate({
          where: {
            spotifyId: profile.id
          },
          defaults: {
            name: profile.displayName,
            spotifyId: profile.id,
            accessToken: accessToken,
            proPic: profile.photos[0],
            refreshToken: refreshToken
          }
        })
        .spread(function (user) {
          console.log('MAKING USER: ', user)

          done(null, user);
        })
        .catch(done);
        // return done(null, profile);
      });
    }));

    // logging middleware
    app.use(morgan('dev'))

    // session middleware with passport
    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'my best friend is Cody',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
      })
    )

    app.use(passport.initialize());
    app.use(passport.session());

        // GET /auth/spotify
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request. The first step in spotify authentication will involve redirecting
    //   the user to spotify.com. After authorization, spotify will redirect the user
    //   back to this application at /auth/spotify/callback
    app.get('/auth/spotify',
    passport.authenticate('spotify', {scope: [ 'user-read-email','playlist-modify-private', 'playlist-modify-public'], showDialog: true}),
    function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
    });

    // GET /auth/spotify/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request. If authentication fails, the user will be redirected back to the
    //   login page. Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
      console.log('IN CALLBACK: ')
      res.redirect('/profile');
    });

    app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
    });


    // body parsing middleware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(bodyParser.json())

    // compression middleware
    app.use(compression())



  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  const syncDb = () => db.sync({ force: true });

  app.listen(PORT, function () {
    syncDb()
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}

//LEGACY INDEX, BASICALLY FRANKENSTEINED EVERYTHING AND COULDN'T FIGURE OUT WHAT TO DO, SO I JUST SCRAPED WHAT WAS THERE AND STARTED ANEW

// const isDev = process.env.NODE_ENV !== 'production';
// if (isDev) require("../secrets")
// const PORT = process.env.PORT || 5000;

// // Multi-process to utilize all CPU cores.
// if (!isDev && cluster.isMaster) {
//   console.error(`Node cluster master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
//   });

// } else {
//   const app = express();

//   // Priority serve any static files.
//   app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//   // Anser Oauth requests
//   app.use("./auth", require("./auth"))

//   // Answer API requests.
//   app.get('/api', function (req, res) {
//     res.set('Content-Type', 'application/json');
//     res.send('{"message":"Hello from the custom server!"}');
//   });

//   // All remaining requests return the React app, so it can handle routing.
//   app.get('*', function(request, response) {
//     response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
//   });

//   const syncDb = () => db.sync({ force: true });

//   app.listen(PORT, function () {
//     syncDb()
//     console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
//   });
// }
