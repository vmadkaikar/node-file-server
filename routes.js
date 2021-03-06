/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/file', require('./api/file'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components)/*')
        .get(errors[404]);

};