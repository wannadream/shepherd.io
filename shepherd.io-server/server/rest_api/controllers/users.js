const mongoose = require('mongoose');
const User = require('../../models/users').User;
const utils = require('../../../lib/utils');

module.exports.usersUpdateOne = function (req, res) {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user) {
            utils.sendJsonResponse(res, 400, 'user not found');
            return;
        } else if (err) {
            utils.sendJsonResponse(res, 400, err);
            return;
        } else {
            const valid = user.validPassword(req.body.currentPassword);
            if (!valid) {
                utils.sendJsonResponse(res, 400, 'User information is not updated. (Wrong Current Password)');
                return;
            } else {
                user.setPassword(req.body.newPassword);
                User.update({
                    email: req.body.email
                }, user, (err, updated) => {
                    utils.sendJsonResponse(res, 200, updated);
                    return;
                });
            }
        }
    });
};