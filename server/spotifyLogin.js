const SpotifyWebApi = require('spotify-web-api-node');
const querystring = require('querystring');
const axios = require('axios');

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URL; // Your redirect uri
const stateKey = 'spotify_auth_state';


//Spotify Login
module.exports.spotifyLogin = function (res) {
    let state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    const scope = 'user-read-email user-read-recently-played';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
       })
    );
};

function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

//Spotify callback + sessions

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
});

module.exports.spotifyCallback = function (req, res) {
    spotifyApi.authorizationCodeGrant(req.query.code)
    .then(function(data) {
        spotifyApi.setAccessToken(data.body.access_token);
        spotifyApi.setRefreshToken(data.body.refresh_token);
        return spotifyApi.getMe()});
        req.session.user = data.body.id.length > 10? data.body.display_name : data.body.id;
};

// const logInAxios = async () => {
//   try {
//     const { data } = await axios.post('https://accounts.spotify.com/api/token',{
//       params: {
//         code: code,
//         redirect_uri: REDIRECT_URI,
//         grant_type: 'authorization_code'
//     }}, {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }}, {
//       auth: {
//         username: CLIENT_ID,
//         password: CLIENT_SECRET
//       }})
//     await console.log(data)
//     const accessToken = data.access_token,
//     const refreshToken = data.refresh_token
//     axios.get('https://api.spotify.com/v1/me',)
//     } catch (error) {
//     console.log("Can't log in through Axios!", error)
//   }
// }

/*axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
    },
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET
    }
}).then(response => {
    console.log(response)

    const accessToken = response.data.access_token,
        refreshToken = response.data.refresh_token

    axios({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }).then(response => {
        // console.log(response)
        res.redirect('/#' + queryString.stringify({
            access_token: accessToken,
            refresh_token: refreshToken
        }))
    }).catch(err => {
        res.redirect('/#' + queryString.stringify({
            error: 'invalid token'
        }))
        console.log(err)
    })
}).catch(err => {
    console.log(err)
})*/
