# DJ Party
Inspired by [Turntable.fm](https://en.wikipedia.org/wiki/Turntable.fm), a realtime web music application that allowas users to share and listen to song with other users

## Features / User Journey
### Login through Spotify account
We implemented OAuth and Passport.js and users can log into DJ Party with the simple click of a button to connect their Spotify account.

### Join an existing room or create a new room
Once a user logs into DJ Party, they are taken to the home page where they can view all available party rooms. A user can join one of the existing rooms by clicking on the room card or create their own, unique, room by clicking the “Start a Party!” button at the top and filling in the required information.

### Tethered a playlist to each room
When a user creates a room, a new playlist with the same name will be added to their Spotify library that will be synced to the newly created room.

### Live search from Spotify and real-time update
From the search bar, you can search any song in Spotify database and add it to your currently connected playlist. This will update a view in sync with the playlist.
(Unfortunately, this feature is currently available only for a user who created a room.)

### Embedded a music player in each room
The main feature of the room is our Spotify Connect Web SDK Player that is used to stream music. This eliminates the need to use third-party streaming apps to ensure everyone has high quality sound and connectivity. The player is set to autoplay the playlist upon entering, but youl can always pause, skip, or go back. Song data populates in real-time on the player as we skip through the playlist.

### Real-time chatting with other users
Our chatroom allow users to send and receive quick messages so users can share their opinions on music and share friendly banter with other listeners.

## Technologies
* PoestgreSQL, Sequelize
* Sequelize - ORM
* Express, Apollo, GraphQL
* OAuth and Passport.js
* React, Styled-component

## ⭐️Created by
  **Deanna Dunne** [GitHub](https://github.com/deannadunne1)|[LinkedIn](https://www.linkedin.com/in/deanna-dunne/)
  **Eunyoung Jeon** [GitHub](https://github.com/eunyjeon)|[LinkedIn](https://www.linkedin.com/in/eunyoung-jeon/)
  **Kristine Lee** [GitHub](https://github.com/kristine-lee)|[LinkedIn](https://www.linkedin.com/in/kristine-d-lee/)
  **Natalie Ng** [GitHub](https://github.com/ngnat)|[LinkedIn](https://www.linkedin.com/in/natalie-ng-a812a811b/)
