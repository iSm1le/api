import * as express from 'express';

import UserCtrl from './controllers/user';

export default function setRoutes(app) {

    const router = express.Router();

    const userCtrl = new UserCtrl();

    // Users
    router.route('/user/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/id/:id').get(userCtrl.get);
    router.route('/user/id/:id').put(userCtrl.update);
    router.route('/user/id/:id').delete(userCtrl.delete);

    // Apply the routes to our application with the prefix /api
    app.use('/', router);
}
