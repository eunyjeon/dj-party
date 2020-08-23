const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({db});
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = express();

const db = require('./db');


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
  // passport.serializeUser(function(user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function(obj, done) {
  //   done(null, obj);
  // });

// logging middleware
  app.use(morgan('dev'))

// body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )

 app.use(require('./auth/passport'))

  // Answer OAuth requests
  app.use("./auth", require('./auth'));
  // Answer API requests.
  app.get('/api', function (req, res) {
   res.set('Content-Type', 'application/json');
   res.send('{"message":"Hello from the custom server!"}');
 });

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
   console.error(err)
   console.error(err.stack)
   res.status(err.status || 500).send(err.message || 'Internal server error.')
  })


  const syncDb = () => db.sync({ force: true });

  app.listen(PORT, function () {
    syncDb()
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
