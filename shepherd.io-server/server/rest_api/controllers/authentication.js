const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../../models/users').User;
const utils = require('../../../lib/utils');

module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        utils.sendJsonResponse(res, 400, {
            'message': 'All fields required'
        });
        return;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function (err) {
        var token;
        if (err) {
            utils.sendJsonResponse(res, 404, err);
        } else {
            token = user.generateJwt();
            utils.sendJsonResponse(res, 200, {
                'token': token
            });
        }
    });
};

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        utils.sendJsonResponse(res, 400, {
            'message': 'All fields are required'
        });
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        var token;
        if (err) {
            console.error(err);
            utils.sendJsonResponse(res, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            utils.sendJsonResponse(res, 200, {
                'token': token
            });
        } else {
            utils.sendJsonResponse(res, 401, info);
        }
    })(req, res);
};