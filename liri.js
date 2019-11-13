require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require("fs");

// var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

var band = process.argv.slice(3).join(" ");



switch (action) {
    case "concert-this":
        seatGeek();
        break;

    case "spotify-this-song":
        spotifyInfo();
        break;

    case "movie-this":
        movieInfo();
        break;

    case "do-what-it-says":
        defaultInput();
        break;
}


function seatGeek() {
    
  axios
  .get('https://api.seatgeek.com/2/events?q='+band+'&client_id=MTk0MTY5NjJ8MTU3MzQ5NDg2NC45Ng')
  .then(function(response) {
    
    for (var i=0;i<response.data.events.length;i++) {

    var title = response.data.events[i].title;   
    var venue = response.data.events[i].venue.name;
    var venue2 = response.data.events[i].venue.address;
    var venue3 = response.data.events[i].datetime_utc;

    var eventTitle = JSON.stringify(title);
    var obj = JSON.stringify(venue);
    var obj2 = JSON.stringify(venue2);
    var obj3 = JSON.stringify(venue3);
   

    console.log(`
    Event Name: ${eventTitle}
    Venue Name: ${obj}
    Venue address: ${obj2}
    The date is: ${obj3}
    --------------`);
    }
  })
  .catch(function(error) {
      if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request ) {
        console.log(error.request);
      } else {
          console.log("error ", error.message);
      }
      console.log(error.config);
  })
}

function spotifyInfo() {

    if (band == "") {
        band = "The Sign";
      } else {
          band = process.argv.slice(3).join(" ");
      }

    var spotify = new Spotify({
        id: "10987fabeb5e49349e3ad8aac4b82126",
        secret: "04e909efe8c644a4a5480f2b4f8bf480"
      });
      
      spotify
      .search({ type: 'track', query: band })
      .then(function(response) {

       
        for (var i=0;i<response.tracks.items.length;i++){
        var obj = JSON.stringify(response.tracks.items[i].artists[0].name);
        var obj2 = JSON.stringify(response.tracks.items[i].name);
        var obj3 = JSON.stringify(response.tracks.items[i].preview_url);
        var obj4 = JSON.stringify(response.tracks.items[i].album.name);
      
        console.log(`
        The artist is: ${obj}
        The song is: ${obj2}
        The preview link is: ${obj3}
        The album is: ${obj4}
        -----------------------------`);
            
        }
        
      })
      
      
    //client id 10987fabeb5e49349e3ad8aac4b82126 secret 04e909efe8c644a4a5480f2b4f8bf480 
.catch(function(error) {
    if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request ) {
      console.log(error.request);
    } else {
        console.log("error ", error.message);
    }
    console.log(error.config);
})
}

function movieInfo() {

    if (band == "") {
        band = "Mr. Nobody";
      } else {
          band = process.argv.slice(3).join(" ");
      }

    axios.get("http://www.omdbapi.com/?t="+band+"&plot=short&apikey=trilogy").then(
        function(response) {
            
            
            console.log(`
            The title is: ${JSON.stringify(response.data.Title)}
            The year is: ${JSON.stringify(response.data.Year)}
            The imdbrating is: ${JSON.stringify(response.data.imdbRating)}
            The rtRating is: ${JSON.stringify(response.data.Ratings[1])}
            The country is: ${JSON.stringify(response.data.Country)}
            The language is: ${JSON.stringify(response.data.Language)}
            The plot is: ${JSON.stringify(response.data.Plot)}
            The actors are: ${JSON.stringify(response.data.Actors)}
            
            `)

        })

        .catch(function(error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request ) {
              console.log(error.request);
            } else {
                console.log("error ", error.message);
            }
            console.log(error.config);
        })
        }

function defaultInput() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) throw error;
        console.log(data);

        var spotify = new Spotify({
            id: "10987fabeb5e49349e3ad8aac4b82126",
            secret: "04e909efe8c644a4a5480f2b4f8bf480"
          });
          
          spotify
          .search({ type: 'track', query: data })
          .then(function(response) {
    
           
            for (var i=0;i<response.tracks.items.length;i++){
            var obj = JSON.stringify(response.tracks.items[i].artists[0].name);
            var obj2 = JSON.stringify(response.tracks.items[i].name);
            var obj3 = JSON.stringify(response.tracks.items[i].preview_url);
            var obj4 = JSON.stringify(response.tracks.items[i].album.name);
          
            console.log(`
            The artist is: ${obj}
            The song is: ${obj2}
            The preview link is: ${obj3}
            The album is: ${obj4}
            -----------------------------`);
                
            }
            
          })
          
          
        //client id 10987fabeb5e49349e3ad8aac4b82126 secret 04e909efe8c644a4a5480f2b4f8bf480 
    .catch(function(error) {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request ) {
          console.log(error.request);
        } else {
            console.log("error ", error.message);
        }
        console.log(error.config);
    })

    })

    
}


