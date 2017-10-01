const user = require('../models/user');

/* eslint-disable func-names, consistent-return */
module.exports = function(app) {
    app.get('/user/:id', (req, res) => {
        user.findOne({ _id: req.params.id }, (err, obj) => {
            if (err) {
                res.send({ status: false, error: 'An error has occured' });
            } else {
                if (!obj) return res.send({ status: false, error: 'User not found' });
                res.json(obj);
            }
        });
    });
    app.put('/user/:id', (req, res) => {
        user.findOneAndUpdate({ _id: req.params.id }, req.body, err => {
            if (err) {
                res.send({ status: false, error: 'An error has occured' });
            } else {
                res.sendStatus(200);
            }
        });
    });
    app.delete('/user/:id', (req, res) => {
        user.findOneAndRemove({ _id: req.params.id }, err => {
            if (err) {
                res.send({ status: false, error: 'An error has occured' });
            } else {
                res.sendStatus(200);
            }
        });
    });
    app.post('/user', (req, res) => {
        const obj = new user(req.body); // eslint-disable-line new-cap
        obj.save((err, item) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                res.sendStatus(400);
            }
            if (err) {
                res.send({ status: false, error: 'An error has occured' });
            }
            res.status(200).json(item);
        });
    });
};
/* eslint-enable func-names */
