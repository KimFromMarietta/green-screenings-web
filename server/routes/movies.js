const express = require('express');
const router = express.Router();
const http = require('http');

const apiKey = process.env.IMDB_API_KEY;
const url = `http://www.omdbapi.com/?apikey=${apiKey}`;

router.get('/', (req, res) => {
  if (!req.query.title) {
    res.send('please provide a \'title\' query to search for. ');
    return;
  } 
  console.log(`searching for movies like '${req.query.title}'`);
  http.get(`${url}&s=${req.query.title}`, response => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      res.json(JSON.parse(data).Search);
    });
    res.on('error', err => {
      console.erro(err);
      res.status(500).send(err);
    })
  });
});

router.get('/:id', (req, res) => {
  console.log(`getting movie id: '${req.params['id']}'`);
  http.get(`${url}&i=${req.params.id}`, response => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      res.json(JSON.parse(data));
    });
    res.on('error', err => {
      console.erro(err);
      res.status(500).send(err);
    })
  });
});

module.exports = router;
