const express = require('express');
const router = express.Router();
const imdb = require('imdb-api');

const apiKey = process.env.IMDB_API_KEY;

router.get('/', (req, res) => {
    console.log(`searching for movies like '${req.query.title}'`);
    imdb.search({
        title: req.query['title']
      }, {
        apiKey: apiKey
      }).then(result => {
            res.status(200).send(result);
          }
      );
});

router.get('/:id', (req, res) => {
    imdb.getById(req.params['id'], { apiKey: apiKey })
    .then(result => {
            res.status(200).send(result);
          }
      );
});

module.exports = router;
