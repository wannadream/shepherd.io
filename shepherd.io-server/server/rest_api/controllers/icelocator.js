const querystring = require('querystring');
const https = require('https');
const utils = require('../../../lib/utils');
const Sheep = require('../../models/sheep').Sheep;

module.exports.detentionLocator = function (req, res) {
    if (req.params && req.body.alienno && req.body.country) {

        const httpClient = (api_path, form_data, success, error) => {
            const post_options = {
                host: 'locator.ice.gov',
                port: '443',
                path: api_path,
                method: 'POST',
                timeout: 3000,
                headers: {
                    'Host': 'locator.ice.gov',
                    'Origin': 'https://locator.ice.gov',
                    'Referer': 'https://locator.ice.gov/odls/',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(form_data)
                }
            };
            // Set up the request
            const post_req = https.request(post_options, (post_req_res) => {
                post_req_res.setEncoding('utf8');
                post_req_res.on('data', (chunk) => {
                    success(chunk);
                });
            });

            post_req.on('error', (e) => {
                console.error(e);
                error(e);
            });

            post_req.write(form_data);
            post_req.end();
        };

        const detaineeData = querystring.stringify({
            'a_number': req.body.alienno,
            'country': req.body.country
        });
        httpClient('/odls/api/anumber', detaineeData, (chunk) => {
            const detainee = JSON.parse(chunk);
            if (!detainee || !detainee.success || detainee.result.length === 0) {
                utils.sendJsonResponse(res, 404, {
                    "message": "Cannot find detainee in ICE locator."
                });
            } else {
                const detentionData = querystring.stringify({
                    'id': detainee.result[0].current_detention_location.id
                });
                httpClient('/odls/api/dtf', detentionData, (chunk) => {
                    const detention = JSON.parse(chunk);
                    if (!detention || !detention.success || detention.result.length === 0) {
                        utils.sendJsonResponse(res, 404, {
                            "message": "Cannot find detention facility in ICE locator."
                        });
                    } else {
                        // Track locator record
                        Sheep.findOne({
                            alienNo: req.body.alienno
                        }).exec(function (err, sheep) {
                            if (sheep) {
                                const detentionFacility = detention.result[0];
                                let address = detentionFacility.address.line1;
                                if (detentionFacility.address.line2) {
                                    address += ',' + detentionFacility.address.line2;
                                }
                                if (detentionFacility.address.line3) {
                                    address += ',' + detentionFacility.address.line3;
                                }
                                address += `, ${detentionFacility.address.city}, ${detentionFacility.address.stateCode} ${detentionFacility.address.zipCode}`;
                                
                                sheep.locatorRecords.push({
                                    facilityName: detentionFacility.name,
                                    facilityAddress: address,
                                    facilityPhone: `(${detentionFacility.phone.areaCode}) ${detentionFacility.phone.exchange} - ${detentionFacility.phone.number}`,
                                    facilityWebsiteUrl: detentionFacility.websiteUrl,
                                    checkDate: new Date()
                                });
                                sheep.save();
                            }
                        });

                        // Return result
                        utils.sendJsonResponse(res, 200, detention.result[0]);
                    }
                }, (error) => {                   
                    utils.sendJsonResponse(res, 400, {
                        "message": "Cannot communicate with ICE locator API."
                    });
                });
            }
        }, (error) => {            
            utils.sendJsonResponse(res, 400, {
                "message": "Cannot communicate with ICE locator API."
            });
        });
    } else {
        utils.sendJsonResponse(res, 400, {
            "message": "Missing parameters."
        });
    }
};