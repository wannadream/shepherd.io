const mongoose = require('mongoose');
const Sheep = require('../../models/sheep').Sheep;
const utils = require('../../../lib/utils');
const d = require('../../models/documents');

module.exports.documentList = function (req, res) {
    utils.sendJsonResponse(res, 200, [
        { text: 'Habeas by Johnson', value: 'habeas_johnson' },
        { text: 'Habeas by Johnson V2', value: 'habeas_johnson_v2' },
        { text: 'Motion for Appointment of Counsel', value: 'motion_for_appointment_of_counsel' }
    ]);
};

module.exports.documentGenerate = function (req, res) {
    var status, content;
    if (req.params && req.params.docname && req.params.sheepid) {
        Sheep.findById(req.params.sheepid).exec(function (err, sheep) {
            if (!sheep) { 
                status = 404;
                content = {
                    "message": "Sheep not found."
                };
                return;
            } else if (err) {
                utils.sendJsonResponse(res, 404, err);
                return;
            }

            // Generate document after finding sheep
            d.documents[req.params.docname](res, sheep);
        });
    } else {
        utils.sendJsonResponse(res, 404, {
            "message": "No document name or sheepid in request."
        });
    }
};