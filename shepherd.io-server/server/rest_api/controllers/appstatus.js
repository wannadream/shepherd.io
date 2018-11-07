const fs = require('fs');
const utils = require('../../../lib/utils');

module.exports.status = function (req, res) {
    const p = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    utils.sendJsonResponse(res, 200, {
        appName: p.name,
        appVersion: p.version
    });
};