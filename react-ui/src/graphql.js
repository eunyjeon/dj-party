import { gql } from '@apollo/client'


export const GET_ME = gql`
  query me {
    me {
      user {
        spotifyUsername
        accessToken
      }
      gotUser
    }
  }
`
export const JOIN_ROOM = gql`
  mutation joinRoom($roomId: ID!) {
    joinRoom(roomId: $roomId) 
  }
`


export const GET_All_ROOMS = gql`
  {
    getAllRooms {
      id
      name
      description
      # public
    }
  }
`
export const GET_ROOM_INFO = gql`
  query getSingleRoom($roomId: ID!) {
    getSingleRoom(roomId: $roomId) {
      id
      name
      description
      playlistId
      messages {
        message
        user {
          spotifyUsername
        }
      }
      users {
        spotifyUsername
        accessToken
      }
    }
  }
`

export const MESSAGE_CREATED = gql`
  subscription messageCreated($roomId: ID!) {
    messageCreated(roomId: $roomId) {
      message
      user {
        spotifyUsername
      }
    }
  }
`

export const USER_JOIN = gql`
  subscription userJoin($roomId: ID!) {
    userJoin(roomId: $roomId) {
      spotifyUsername
    }
  }
`

export const USER_LEFT = gql`
  subscription userLeft($roomId: ID!) {
    userLeft(roomId: $roomId) {
      spotifyUsername
    }
  }
`

export const GET_PLAYLIST = gql`
  query getPlaylist($playlistId: String!) {
    getPlaylist(playlistId: $playlistId) {
      tracks{
        id
        name
        artists {
          name
        }
        album {
          name
          images {
            url
          }
        }
      }
    }
  }

`

export const SONG_ADDED_TO_PLAYLIST = gql`
  subscription songAddedToPlaylist($playlistId: String) {
    songAddedToPlaylist(playlistId: $playlistId) {
      tracks{
        id
        name
        artists {
          name
        }
        album {
          name
          images {
            url
          }
        }
      }
    }
  }
`
export const CREATE_MESSAGE = gql`
  mutation createMessage($roomId: ID, $message: String!) {
    createMessage(roomId: $roomId, message: $message) {
      message
      user {
        spotifyUsername
      }
    }
  }
`

export const CREATE_ROOM = gql`
  mutation createRoom($name: String!, $description: String, $public: Boolean) {
    createRoom(name: $name, description: $description, public: $public) {
      ok
      roomMade {
        id
        name
        # messages
        # users
        # isCreator
        # public
        # description
      }
    }
  }
`

export const CREATE_PLAYLIST = gql`
  mutation createPlaylist($name: String, $description: String, $roomId: ID!){
    createPlaylist(name: $name, description: $description, roomId: $roomId)
  }
`