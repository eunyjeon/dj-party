# DJ Party

## MVP
1. Rooms
  - All public

2. Creating a Playlist
  - "POST	/v1/users/{user_id}/playlists" -> grab playlistId
    - All private collaborative (Not public)

3. (Join a room) [https://developer.spotify.com/documentation/web-api/reference/playlists/]
  - Click a roomCard on /home page to..
    - move into /room/id
    - see all messages
    - "GET	/v1/playlists/{playlist_id}	Get a Playlist"

4. Searching for a song
  - "GET https://api.spotify.com/v1/search" -> grab track uri
  - "POST	/v1/playlists/{playlist_id}/tracks"
    - Adding songs to the collaborative playlist
    - clcikHandler (click a track from the search result)-> using playlistID + a track uri

5. Playing a song
  - Web Player SDK

6. Leaving a room

Creating a Playlist: PlaylistId
Searching a song : track uri
add a song to the playlist using track uri and playlistId
