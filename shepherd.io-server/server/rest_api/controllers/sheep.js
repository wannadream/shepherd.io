const mongoose = require('mongoose');
const Sheep = require('../../models/sheep').Sheep;
const utils = require('../../../lib/utils');

module.exports.sheepList = function (req, res) {
    Sheep.find(function (err, results, stats) {
        if (err) {
            utils.sendJsonResponse(res, 400, err);
        } else {
            utils.sendJsonResponse(res, 200, results);
        }
    });
};

module.exports.sheepCreate = function (req, res) {
    Sheep.create(req.body, function (err, sheep) {
        if (err) {
            utils.sendJsonResponse(res, 400, err);
        } else {
            utils.sendJsonResponse(res, 200, sheep);
        }
    });
};

module.exports.sheepReadOne = function (req, res) {
    var status, content;
    if (req.params && req.params.sheepid) {
        Sheep.findById(req.params.sheepid).exec(function (err, sheep) {
            if (!sheep) {
                utils.sendJsonResponse(res, 404, 'sheep not found');
                return;
            } else if (err) {
                utils.sendJsonResponse(res, 400, err);
                return;
            }
            utils.sendJsonResponse(res, 200, sheep);
        });
    } else {
        utils.sendJsonResponse(res, 404, {
            "message": "No sheepid in request."
        });
    }
};

module.exports.sheepUpdateOne = function (req, res) {
    Sheep.findByIdAndUpdate(req.body._id, req.body, function (err, sheep) {
        if (!sheep) {
            utils.sendJsonResponse(res, 404, 'sheep not found');
            return;
        } else if (err) {
            utils.sendJsonResponse(res, 400, err);
            return;
        }
        utils.sendJsonResponse(res, 200, sheep);
    });
};

module.exports.sheepDeleteOne = function (req, res) {
    Sheep.findByIdAndRemove(req.body._id, function (err, sheep) {
        if (!sheep) {
            utils.sendJsonResponse(res, 404, 'sheep not found');
            return;
        } else if (err) {
            utils.sendJsonResponse(res, 400, err);
            return;
        }
        utils.sendJsonResponse(res, 200, sheep);
    })
};