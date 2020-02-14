var express = require("express");
var path = require("path");
// var friends = require("../app/data/friends");

var app = express();
var PORT = 3040;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var friends = [
  {
    routeName: "josh",
    name: "josh",
    scores: [1, 2, 3, 4, 5]
  },
  {
    routeName: "jessah",
    name: "jessah",
    scores: [5, 5, 5, 5, 5]
  },
  {
    routeName: "rick",
    name: "rick",
    scores: [3, 3, 3, 3, 3]
  },
  {
    routeName: "james",
    name: "james",
    scores: [2, 2, 2, 2, 2]
  }
];

//routes to API

app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

app.post("/api/friends", function(req, res) {
  var newFriend = req.body;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
  console.log(friends);
  friends.push(newFriend);
  res.json(newFriend);
});

//routes to HTML
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/survey.html"));
});

app.post("/api/friends/compare", function(req, res) {
  var newFriend = req.body;
  var matchedFriend = "";
  var matchedlDiff = 0;
  //index i is for friends array
  for (var i = 0; i < friends.length; i++) {
    //index y is for scores array

    var totalDiff = 100000;

    for (var y = 0; y < friends[i].scores.length; y++) {
      var currentDiff =
        Math.abs(newFriend.scores[y]) - parseInt(friends[i].scores[y]);

      totalDiff = Math.abs(currentDiff) + totalDiff;
    }
    if (matchedlDiff === 0) {
      matchedlDiff = totalDiff;
      matchedFriend = friends[i].name;
    }
    if (totalDiff <= matchedlDiff) {
      matchedFriend = friends[i].name;
      matchedlDiff = totalDiff;
      console.log(matchedFriend);
    }

    res.json(matchedFriend);
  }
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
