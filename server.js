// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test'); // connect to our database
var pin     = require('./model/pin.js');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.set('views', __dirname + '/views');


//app.engine('html', require('ejs').renderFile)
//app.engine('ejs', );

app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================

/*
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
*/
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);

app.use(express.static(path.join(__dirname, 'public')));

app.post('/pin', function(req,res){
    // create a new user
    var description = req.body.description;
    var name = req.body.name;
    var lat = req.body.lat;
    var lon = req.body.lon;
    var newPin = pin({
      name: name,
      description: description,
      lat : lat,
      lon : lon
    });

    // save the user
    newPin.save(function(err) {
      if (err) throw err;
      res.end();
    });
  }
);



app.get('/allpin', function(req,res){
    var a;
    // get all the users
    a = pin.find({}, function(err, pins) {
    if (err) throw err;
    res.send(pins);
    });
   
});


// ok app, when someone issues an HTTP GET request to the root '/' addresss,
app.get('/', function(req, res){
    console.log("KING OF ENGLAND");
    res.render('index.html');
    res.end();
});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);