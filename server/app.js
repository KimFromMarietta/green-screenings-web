var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var port    = process.env.PORT || 5000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/api', require('./routes/index'));
app.use('/api/movies', require('./routes/movies'));

app.use('/', express.static('build'));

app.listen(port);
console.log('Server started on ' + port);