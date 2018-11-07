const mongoose = require('mongoose');
const News = require('../../models/news').News;
const parseString = require('xml2js').parseString;
const https = require('https');
const utils = require('../../../lib/utils');

module.exports.newsList = function (req, res) {
    News.find({}).limit(50).sort('-pubDate').exec(function (err, results, stats) {
        if (err) {
            utils.sendJsonResponse(res, 400, err);
        } else {
            utils.sendJsonResponse(res, 200, results);
        }
    });
};

module.exports.newsListSearchByTitle = function (req, res) {
    if (req.params && req.params.keywords) {
        const keyWords = req.params.keywords.replace(' ', '|').replace('\\', '\\\\');
        const regex = new RegExp(keyWords, 'i');
        News.find({
            title: regex
        }).sort('-pubDate').exec(function (err, results, stats) {
            if (err) {
                utils.sendJsonResponse(res, 400, err);
            } else {
                utils.sendJsonResponse(res, 200, results);
            }
        });
    } else {
        utils.sendJsonResponse(res, 400, {
            "message": "No key word."
        });
    }
};

module.exports.refreshNewsFromFeeds = function (req, res) {
    try {

        const googleNewsPromise = new Promise((resolve, reject) => {
            const post_options = {
                host: 'news.google.com',
                port: '443',
                path: '/news/rss/search/section/q/immigration/immigration?hl=en&gl=US&ned=us',
                method: 'GET',
                timeout: 10000
            };
            // Set up the request
            const post_req = https.request(post_options, (post_req_res) => {
                let xmlStr = '';
                post_req_res.setEncoding('utf8');
                post_req_res.on('data', (chunk) => {
                    xmlStr += chunk;
                });
                post_req_res.on('end', () => {
                    parseString(xmlStr, (err, result) => {
                        const findPromises = [];
                        const items = result.rss.channel[0].item;
                        items.forEach((value) => {
                            findPromises.push(News.findOne({
                                'title': value.title[0]
                            }));
                        });
                        Promise.all(findPromises).then((values) => {
                            const addPromised = [];
                            for (let index = 0; index < values.length; index++) {
                                const element = values[index];
                                if (!element) {
                                    addPromised.push(News.create({
                                        source: 'Google News',
                                        title: items[index].title[0],
                                        link: items[index].link[0],
                                        pubDate: items[index].pubDate[0],
                                        description: items[index].description[0],
                                        category: items[index].category[0]
                                    }));
                                }
                            }
                            Promise.all(addPromised)
                                .then(newNews => resolve(newNews))
                                .catch((e) => reject(e));
                        });
                    });
                });
            });

            post_req.on('error', (e) => {
                reject(e);
            });
            post_req.end();
        });

        const nationaPublicRadioNewsPromise = new Promise((resolve, reject) => {
            const post_options = {
                host: 'www.npr.org',
                port: '443',
                path: '/rss/rss.php?id=127600895',
                method: 'GET',
                timeout: 10000
            };
            // Set up the request
            const post_req = https.request(post_options, (post_req_res) => {
                let xmlStr = '';
                post_req_res.setEncoding('utf8');
                post_req_res.on('data', (chunk) => {
                    xmlStr += chunk;
                });
                post_req_res.on('end', () => {
                    parseString(xmlStr, (err, result) => {
                        const findPromises = [];
                        const items = result.rss.channel[0].item;
                        items.forEach((value) => {
                            findPromises.push(News.findOne({
                                'title': value.title[0]
                            }));
                        });
                        Promise.all(findPromises).then((values) => {
                            const addPromised = [];
                            for (let index = 0; index < values.length; index++) {
                                const element = values[index];
                                if (!element) {
                                    addPromised.push(News.create({
                                        source: 'National Public Radio',
                                        title: items[index].title[0],
                                        link: items[index].link[0],
                                        pubDate: items[index].pubDate[0],
                                        description: items[index].description[0],
                                        content: items[index]['content:encoded'][0]
                                    }));
                                }
                            }
                            Promise.all(addPromised)
                                .then(newNews => resolve(newNews))
                                .catch((e) => reject(e));
                        });
                    });
                });
            });

            post_req.on('error', (e) => {
                reject(e);
            });
            post_req.end();
        });

        Promise.all([googleNewsPromise, nationaPublicRadioNewsPromise]).then(data => {
            utils.sendJsonResponse(res, 200, data);
        }).catch(e => {
            console.error(e);
            utils.sendJsonResponse(res, 400, {
                "message": e.message
            });
        });

    } catch (e) {
        console.error(e.message);
        utils.sendJsonResponse(res, 400, {
            "message": "cannot parse news feed."
        });
    }
};