const express = require('express');
const path = require('path');
const morgan = require('morgan')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const db = require("./db");

//natalie add-ons
const User = require('./db/models')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const bodyParser = require('body-parser')
const SpotifyStrategy = require('./passport-spotify/index').Strategy;
const sessionStore = new SequelizeStore({db})

const isDev = process.env.NODE_ENV !== 'production';
if (isDev) require("../secrets")
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

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(bodyParser.json())

  // compression middleware
  app.use(compression())

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  app.use(morgan('dev'))
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

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('hi!')
        const [user] = await db.models.user.findOrCreate({
          where: {
            spotifyId: profile.id
          },
          defaults: {
            spotifyId: profile.id,
            accessToken: accessToken,
            proPic: profile.photos[0],
            refreshToken: refreshToken
          }
        })
        done(null, user);
      } catch(err) { done(err) }
      }))


    // GET /auth/spotify
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request. The first step in spotify authentication will involve redirecting
    //   the user to spotify.com. After authorization, spotify will redirect the user
    //   back to this application at /auth/spotify/callback

      app.get('/auth/spotify',
      passport.authenticate('spotify', {scope: [ 'user-read-email','playlist-modify-private', 'playlist-modify-public'], showDialog: true}))

      app.get('/auth/me', (req, res) => {
        try {
          console.log('CURRENT SESSION: is', req.user)
          res.json(req.user)
        } catch (error) {
          console.log(error)
        }
      })

    // GET /auth/spotify/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request. If authentication fails, the user will be redirected back to the
    //   login page. Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get(
      '/callback', 
      passport.authenticate('spotify', {
        successRedirect: '/home',
        failureRedirect: '/login'
      }))
    
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
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
