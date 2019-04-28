var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var friends = ['Sam', 'John', 'Clive', 'Joe', 'Bob'];

// Have to install and configure body-parser to be able to use req.body.
// bodyParser takes the request object and parses it into a JS object that
// we can access like wedo below: req.body.newFriend
app.use(bodyParser.urlencoded({extended: true}));

// tell express to serve the public directory
app.use(express.static("public"));

// tell express that all files passed to res.render, 
// i.e. template files, are .ejs files
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render('home');
});

// res.render looks in the views directory for the file.
app.get("/friends", function(req, res) {
  // The value 'friends' is the array above.
  // The key 'friends' is the variable that can be accessed in friends.ejs
  res.render('friends', {friends: friends});
});

// app.post is only triggered by post requests to the URL, not URL get requests.
// The form in friends.ejs POSTS the request object to the /addFriend
// URL / route. Therefore, req.body.newFriend can be accessed and 
// pushed to the friends array in the function that is called when the 
// /addFriend route is 'hit'.
// Then the browser is redirected to /friends, and the callback for that
// route is called, re-rendering the newly updated friends array.
app.post('/addfriend', function(req, res) {
  var newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect('/friends');
});

app.listen(3000, function() {
  console.log('Server started...');
});