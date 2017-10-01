const userRoutes = require('./user_routes');
/* eslint-disable func-names */
module.exports = function(app, db) {
    app.get('/', (req, res) => {
        res.redirect(301, '/docs');
    });
    userRoutes(app, db);
};
/* eslint-enable func-names */
