const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(db.url, { useMongoClient: true });
const database = mongoose.connection;
mongoose.Promise = global.Promise;

database.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line no-console
database.once('open', () => {
    console.log('MongoDB connected!'); // eslint-disable-line no-console
    require('./app/routes')(app);
    app.listen(port, () => {
        console.log(`Live on ${port} port`); // eslint-disable-line no-console
    });
});
