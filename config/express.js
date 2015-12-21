/**
 * Express configuration
 */

'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./environment');
var apiRoutes = express.Router();

module.exports = function(app) {
    var env = app.get('env');

    app.set('dataFolder', config.root + config.dataFolder);

    //apiRoutes.use(function(req, res, next)  {
    //    if(req.originalUrl === '/api/security/login' || req.originalUrl === '/login.html' || req.originalUrl.indexOf('/login/') > -1
    //        || req.originalUrl.indexOf('/assets/') > -1 || req.originalUrl.indexOf('/bower_components/') > -1
    //        || req.originalUrl.indexOf('/favicon.ico') > -1 || req.originalUrl.indexOf('/download/unsecured/') > -1) {
    //        next();
    //        return;
    //    }
    //    // check header or url parameters or post parameters for token
    //    var token = req.cookies['rapid-session-id'];
    //
    //    // decode token
    //    if (token) {
    //        // verifies secret and checks exp
    //        jwt.verify(token, config.secretKey, function(err, decoded) {
    //            if (err) {
    //                console.log(req.originalUrl + ' Invalid token, redirection to login');
    //                res.redirect('/login.html');
    //            } else {
    //                // if everything is good, save to request for use in other routes
    //                req.user = decoded;
    //                next();
    //            }
    //        });
    //    } else {
    //        console.log(req.originalUrl + ' No token present redirection to login');
    //        res.redirect('/login.html');
    //    }
    //});

    app.use(compression());
    app.use(apiRoutes);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    //if ('production' === env) {
    //    app.use(express.static(path.join(config.root, 'public')));
    //    app.use('/static', express.static(path.join(config.root, 'server/data/images')));
    //    app.set('appPath', config.root + '/public');
    //}
    //
    //if ('development' === env || 'test' === env) {
    //    //app.use(require('connect-livereload')());
    //    app.use(express.static(path.join(config.root, '.tmp')));
    //    app.use(express.static(path.join(config.root, 'client')));
    //    app.use('/static', express.static(path.join(config.root, 'server/data/images')));
    //    app.set('appPath', 'client');
    //    app.use(errorHandler()); // Error handler - has to be last
    //}
};
