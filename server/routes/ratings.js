const express = require('express');
const router = express.Router();
const Mongo = require('mongodb');
const _ = require('lodash');

const url = process.env.MONGO_URL;
const dbName = process.env.MOVIE_DB;

router.get('/', (req, res) => {
    Mongo.connect(url, function (err, conn) {
        if (err) {
            console.error(`ERROR getting movies: ${err}`);
            // console.error(`Attmempted with url: ${url}`);
            res.status(500).send(err);
            return;
        }

        const db = conn.db(dbName);

        console.log("Connected successfully to server");

        findDocuments(db, (docs) => {
            res.status(200).send(docs);
        });
    });
});

router.get('/tags', (req, res) => {
    Mongo.connect(url, function (err, conn) {
        if (err) {
            console.error(`ERROR getting tags: ${err}`);
            res.status(500).send(err);
            return;
        }

        const db = conn.db(dbName);

        console.log("Connected successfully to server");

        findWithField({ tags: 1 }, db, (docs) => {
            const result = docs.map((doc) => doc.tags)
                .reduce((agg, tags) => _.union(agg, tags), []);
            res.status(200).send(result);
        });
    });
});

router.put('/', (req, res) => {
    Mongo.connect(url, function (err, conn) {
        if (err) {
            console.error(`ERROR upserting movie: ${err}`);
            res.status(500).send(err);
        }

        const db = conn.db(dbName);

        const movie = req.body;
        console.log(`Connected successfully, attempting to ${movie._id ? 'update' : 'insert'} ${movie.title}`);

        if (!movie.imdbid) res.status(422).send({error: 'invalid movie: no imdbid found'});
        
        upsertDocument(movie, db, (result) => {
            console.log(result.result);
            res.status(200).send(result.result);
        });
    });
});

router.delete('/:id', (req, res) => {
    Mongo.connect(url, function (err, conn) {
        if (err) {
            console.error(`ERROR deleteing movie: ${err}`);
            res.status(500).send(err);
        }

        const db = conn.db(dbName);

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
        callback(docs);
    });
}

const findWithField = function (fields, db, callback) {
    // Get the documents collection
    const collection = db.collection('movies');
    // Find some documents
    collection.find({}).project(fields).toArray(function (err, docs) {
        callback(docs);
    });
}

const upsertDocument = function (movie, db, callback) {
    // Get the documents collection
    const collection = db.collection('movies');
    // Find some documents
    const id = movie._id;
    delete movie._id;
    collection.update({ _id: new Mongo.ObjectID(id) }, movie, { upsert: true }).then(callback);
}

const removeDocument = function (id, db, callback) {
    // Get the documents collection
    const collection = db.collection('movies');
    // Find some documents
    const result = collection.remove({ _id: new Mongo.ObjectID(id) }).then(callback);
}

module.exports = router;