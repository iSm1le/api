const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, database) => { // eslint-disable-line consistent-return
    if (err) return console.log(err); // eslint-disable-line no-console
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log(`Live on ${port} port`); // eslint-disable-line no-console
    });
});
