var path = require('path');
var hxp = require('hogan-express');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//view engine set up 
app.engine('html', hxp);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Listen to the App Engine-specified port, or 3000 otherwise
const PORT = process.env.PORT || 3000;

//set up http parsing for JSON 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));

//set up the routing
var routes = require(path.join(__dirname, 'routes/router'))();
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log('CTRL + C to terminate batch job');
});