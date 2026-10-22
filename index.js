// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let parsed;

  if (!date) {
    // Test 7 & 8: empty param returns the current time
    parsed = new Date();
  } else if (/^-?\d+$/.test(date)) {
    // Input is all digits: treat as a millisecond timestamp
    parsed = new Date(Number(date));
  } else {
    // Otherwise let Date try to parse it
    parsed = new Date(date);
  }

  // Test 6: invalid dates
  if (isNaN(parsed.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Tests 2, 3, 4: valid dates
  res.json({
    unix: parsed.getTime(),   // a Number, not a string
    utc: parsed.toUTCString() // "Fri, 25 Dec 2015 00:00:00 GMT"
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
