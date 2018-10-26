var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
  {
    name: "John Test",
    phoneNumber: 5555555555,
    email: 'test@test.com',
    uniqueID: 1234
  }
];

var waitList = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});

app.post("/api/tables", function(req, res) {
  var newTable = req.body;

  for (var i=0; i<reservations.length; i++) {
    if (newTable.uniqueID === reservations[i].uniqueID) {
      console.log('You have a reservation');
    }
  }
  reservations.push(newTable);
  res.json(newTable);
});

app.post("/api/waitlist", function(req, res) {
  var newTable = req.body;
  waitList.push(newTable);
  res.json(newTable);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});