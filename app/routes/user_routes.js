const objectID = require('mongodb').ObjectID;
/* eslint-disable func-names */
module.exports = function(app, db) {
    app.get('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: objectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({ error: 'An error has occured' });
            } else {
                res.send(item);
            }
        });
    });
    app.put('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: objectID(id) };
        const user = {
            username: req.body.username,
            passowrd: req.body.password
        };
        db.collection('users').update(details, user, (err, result) => {
            if (err) {
                res.send({ error: 'An error has occured' });
            } else {
                res.send(user);
            }
        });
    });
    app.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: objectID(id) };
        db.collection('users').remove(details, err => {
            if (err) {
                res.send({ error: 'An error has occured' });
            } else {
                res.send({
                    id: id,
                    status: 'deleted'
                });
            }
        });
    });
    app.post('/users', (req, res) => {
        const user = {
            username: req.body.username,
            passowrd: req.body.password
        };
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({ error: 'An error has occured' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};
/* eslint-enable func-names */
