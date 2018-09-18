var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var port    = process.env.PORT || 4000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/api', require('./routes/index'));
app.use('/api/ratings', require('./routes/ratings'));
app.use('/api/movies', require('./routes/movies'));

// WEB APP TURNED OFF
// app.use('/', express.static('build')); 
app.use('/', (req, res) => {
    res.json({
        endpoints: [
            '/api/movies',
            '/api/ratings'
        ]
    })
});

app.listen(port);
console.log('Server started on ' + port);
