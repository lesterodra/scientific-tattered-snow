// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.json());
app.use(morgan('combined'));

// Define cron
const emailNotificationJob = require('./jobs/emailNotification');
emailNotificationJob.start();

// Define all routers
require('./api/routes/christmasLetter')(router);
app.use('/api', router);

// in memory storage
global.pendingEmail = [];

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
