const express = require('express');
const router = express.Router();
const Mongo = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';

router.get('/', (req, res) => {
    Mongo.connect(url, function (err, conn) {
        if (err) {
            console.error(`ERROR: ${err}`);
            res.status(500).send(err);
        }

        const db = conn.db('wkg-mongo1');

        console.log("Connected successfully to server");

        findDocuments(db, (docs) => {
            res.status(200).send(docs);
        });
    });
});

router.put('/', (req, res) => {
    Mongo.connect(url, function (err, conn) {
        if (err) {
            console.error(`ERROR: ${err}`);
            res.status(500).send(err);
        }

        const db = conn.db('wkg-mongo1');

        const movie = req.body;
        console.log(`Connected successfully, attempting to ${movie._id ? 'update' : 'insert'} ${movie.title}`);

        upsertDocument(movie, db, (result) => {
            console.log(result.result);
            res.status(200).send(result.result);
        });
    });
});

router.delete('/:id', (req, res) => {
    Mongo.connect(url, function (err, conn) {
        if (err) {
            console.error(`ERROR: ${err}`);
            res.status(500).send(err);
        }

        const db = conn.db('wkg-mongo1');

        console.log("Connected successfully, attempting delete on " + req.params.id);

        removeDocument(req.params.id, db, (result) => {
            console.log(result.result);
            res.status(200).send(result.result);
        });
    });
});

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('movies');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        console.log("Found the following movies");
        console.log(docs)
        callback(docs);
    });
}

const upsertDocument = function (movie, db, callback) {
    // Get the documents collection
    const collection = db.collection('movies');
    // Find some documents
    const id = movie._id;
    delete movie._id;
    collection.update({_id: new Mongo.ObjectID(id)}, movie, {upsert: true}).then(callback);
}

const removeDocument = function (id, db, callback) {
    // Get the documents collection
    const collection = db.collection('movies');
    // Find some documents
    const result = collection.remove({_id: new Mongo.ObjectID(id)}).then(callback);
}

module.exports = router;