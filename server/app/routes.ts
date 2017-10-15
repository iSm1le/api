import * as express from 'express';

import UserCtrl from './controllers/user';

const config = require('../../config/config');

export default function setRoutes(app) {

    const router = express.Router();

    const userCtrl = new UserCtrl();

    router.route('/').get(function(req, res) { res.redirect('docs'); });

    // Users
    router.route('/user/login').post(userCtrl.login);
    router.route('/user').post(userCtrl.insert);

    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user/id/:id').get(userCtrl.get);
    router.route('/user/id/:id').put(userCtrl.update);
    router.route('/user/id/:id').delete(userCtrl.remove);

    // Apply prefix to app
    app.use('/', router);
}
