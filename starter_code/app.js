const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(`${__dirname}/views/partials`);


// setting the spotify-api goes here:
const clientId = '8a4ecb749ec1492fb9a0ca41aa379e44',
    clientSecret = '9f04323433ae45a383ff45d7d79eabc8';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })





// the routes go here:

app.get('/', (req, res, next) => {
    res.render('index');
  });

app.post('/artists', (req, res, next) => {
    console.log(req.body);
    spotifyApi.searchArtists(req.body.artist)
    .then(data => {

      console.log("The received data from the API: ", data.body.artists);
    //   const artists = data.body.items;
      res.render('artists', { data });
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
});

app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
