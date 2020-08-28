// type UserPlaylist {
//     id: ID!
//     name: String
//     tracks: [Track]
//     collaborative: Boolean
//     uri: String
//   },
//   type Track {
//     id: ID!,
//     name: String
//   }

// # userPlaylist(user: User): UserPlaylist
// #need to get the playlist by the user


 //   const pubSub = new PubSub()  
  //   const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  //   dataSources: () => ({
  //     playlistAPI: new PlaylistAPI()
  //   }),
  //   context: ({req, res}) => {
  //     return {
  //       session: req.session,
  //       pubSub
  //     }
  //     //return req, res
  //     // const apolloContext = await buildExecutionContext({req, res, User})
  //     // return apolloContext
  //   },
  //   introspection: true,
  //   playground: true
  // })


  // server.applyMiddleware({app, path: '/graphql'})


    //apollo server setup

// const graphqlEndpoint = '/graphql';

  // const server = new ApolloServer({
  //   introspection: true,
  //   playground: true,
  //   debug: true,
  //   typeDefs,
  //   resolvers,
  //   context: ({ req }) => ({
  //     getUser: () => req.user,
  //     logout: () => req.logout(),
  //   }),
  // });

// app.use(
//   graphqlEndpoint,
//   bodyParser.json(),
//   graphqlExpress({
//     schema,
//     context: {
//       models,
//       user: {
//         id: 1,
//       },
//     },
//   }),
// );



    // GET /auth/spotify/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request. If authentication fails, the user will be redirected back to the
    //   login page. Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.


    //
  //   type CreateRoomResponse {
  //     ok: Boolean!
  //     errors: [Error!]
  // }

  // getUser(roomId: ID!, id: ID!): User!