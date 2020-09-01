/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { default as LoginPage } from './auth-form'
export { default as Rooms } from './rooms'
export { default as SingleRoom } from './singleRoom/singleRoom'
export {default as UsersList} from './singleRoom/usersList'
