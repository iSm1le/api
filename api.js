const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(db.url, { useMongoClient: true }, err => { // eslint-disable-line consistent-return
    if (err) return console.log(err); // eslint-disable-line no-console
    require('./app/routes')(app);
    app.listen(port, () => {
        console.log(`Live on ${port} port`); // eslint-disable-line no-console
    });
});
