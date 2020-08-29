const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const db = require('./db')
const seed = require('../seed/seedScript')

//natalie add-ons
const models = require('./db/models')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const bodyParser = require('body-parser')
const SpotifyStrategy = require('./passport-spotify/index').Strategy
const sessionStore = new SequelizeStore({ db })

const { ApolloServer} = require('apollo-server');
const { fileLoader, mergeTypes, mergeResolvers }= require('merge-graphql-schemas');
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));
let userId = ''
const isDev = process.env.NODE_ENV !== 'production';
if (isDev) require("../secrets")
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    )
  })
} else {
  const app = express()

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // compression middleware
  app.use(compression())

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')))
  app.use(morgan('dev'))
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (obj, done) {
    done(null, obj)
  })

  passport.use(
    new SpotifyStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('hi!')
          const [user] = await db.models.user.findOrCreate({
            where: {
              spotifyUsername: profile.id,
            },
            defaults: {
              spotifyUsername: profile.id,
              accessToken: accessToken,
              proPic: profile.photos[0],
              refreshToken: refreshToken,
            },
          })
          done(null, user)
        } catch (err) {
          done(err)
        }
      }
    )
  )

  app.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
      scope: [
        'user-read-email',
        'playlist-modify-private',
        'playlist-modify-public',
      ],
      showDialog: true,
    })
  )

  app.get('/auth/me', (req, res) => {
    try {
      console.log('CURRENT SESSION: is', req.user)
      userId = req.user
      res.json(req.user)
    } catch (error) {
      console.log(error)
    }
  })

  app.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login',
    })
  )

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })


  const server = new ApolloServer({
    introspection: true,
    playground: true,
    debug: true,
    typeDefs,
    resolvers,
    context: () => {
      return {
        models,
        getUser:() => userId
    }},
  })

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(
      path.resolve(__dirname, '../react-ui/build', 'index.html')
    )
  })

  const syncDb = () => db.sync()

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })

  app.listen(PORT, function () {
    syncDb()
    // seed()
    console.error(
      `Node ${
        isDev ? 'dev server' : 'cluster worker ' + process.pid
      }: listening on port ${PORT}`
    )
  })
}