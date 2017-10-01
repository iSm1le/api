const userRoutes = require('./user_routes');
/* eslint-disable func-names */
module.exports = function(app, db) {
    userRoutes(app, db);
};
/* eslint-enable func-names */
