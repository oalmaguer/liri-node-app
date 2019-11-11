require("dotenv").config();

const axios = require("axios");

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

var band = process.argv[3];

switch (action) {
    case "concert-this":
        //function
        seatGeek();
        break;

    case "spotify-this-song":
        //function
        break;

    case "movie-this":
        //function
        break;

    case "do-what-it-says":
        //function
        break;
}


var auth = "https://api.seatgeek.com/2/events?client_id=MTk0MTY5NjJ8MTU3MzQ5NDg2NC45Ng";


function seatGeek() {
    var queryURL = 'https://api.seatgeek.com/2/events?performers.slug='+band+'?cliend_id=MTk0MTY5NjJ8MTU3MzQ5NDg2NC45Ng';

  axios
  .get(queryURL)
  .then(function(response) {

    console.log(response);
  })
  .catch(function(error) {
      if (error.response) {
          console.log(error.response);
      }
  })
}
