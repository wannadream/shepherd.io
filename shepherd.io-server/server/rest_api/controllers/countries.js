const fs = require('fs');
const utils = require('../../../lib/utils');

module.exports.countryList = function (req, res) {
    utils.sendJsonResponse(res, 200, JSON.parse(fs.readFileSync('./server/models/countries.json', 'utf8')));
};