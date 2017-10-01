const userRoutes = require('./user_routes');
/* eslint-disable func-names */
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.redirect(301, '/docs');
    });
    userRoutes(app);
};
/* eslint-enable func-names */
