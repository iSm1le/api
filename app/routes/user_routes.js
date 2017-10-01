const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* eslint-disable func-names, consistent-return */
module.exports = function(app) {
    app.get('/user/:id', (req, res) => {
        User.findOne({ _id: req.params.id }, (err, obj) => {
            if (err) {
                res.send({ status: false, error: 'An error has occured' });
            } else {
                if (!obj) return res.send({ status: false, error: 'User not found' });
                res.json(obj);
            }
        });
    });
    app.put('/user/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, err => {
            if (err) {
                res.send({ status: false, error: 'An error has occured' });
            } else {
                res.sendStatus(200);
            }
        });
    });
    app.delete('/user/:id', (req, res) => {
        User.findOneAndRemove({ _id: req.params.id }, err => {
            if (err) {
                res.send({ status: false, error: 'An error has occured' });
            } else {
                res.sendStatus(200);
            }
        });
    });
    app.post('/user/register', (req, res) => {
        const obj = new User(req.body); // eslint-disable-line new-cap
        obj.password = bcrypt.hashSync(req.body.password, 10);
        obj.save((err, item) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                res.sendStatus(400).send({ message: 'User exists!' });
            }
            if (err) {
                res.sendStatus(400).send({ message: err });
            }
            item.password = undefined;
            return res.status(200).json(item);
        });
    });
    app.post('/user/login', (req, res) => {
        User.findOne({ email: req.body.email }, (err, obj) => {
            if (err) throw err;
            if (!obj) {
                res.status(401).json({ message: 'Auth failed. User not found' });
            } else if (obj) {
                if (!obj.comparePassword(req.body.password)) {
                    res.status(401).json({ message: 'Auth failed. Wrong password' });
                } else {
                    return res.json({
                        token: jwt.sign({
                            email: obj.email,
                            username: obj.username,
                            _id: obj._id
                        }, 'RESTFULAPIs')
                    });
                }
            }
        });
    });
    app.post('/user/islogged', (req, res, next) => {
        if (req.user) {
            next(); // eslint-disable-line callback-return
        } else {
            return res.status(401).json({ message: 'Unauthorized user!' });
        }
    });
};
/* eslint-enable func-names */
