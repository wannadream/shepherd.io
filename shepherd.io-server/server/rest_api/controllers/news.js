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
                path: '/_/rss/topics/CAAqBwgKMJej0wEwpcY1?hl=en-US&gl=US&ceid=US%3Aen',
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
                                    const item = items[index];
                                    const newNews = {
                                        source: 'Google News',
                                        title: item.title[0],
                                        link: item.link[0],
                                        pubDate: item.pubDate[0],
                                        description: item.description[0],
                                        // category: item.category[0]
                                    };
                                    if (item['media:content'] && item['media:content'][0]) {
                                        newNews.mediaContent = {
                                            url: item['media:content'][0].$.url,
                                            medium: item['media:content'][0].$.medium,
                                            width: item['media:content'][0].$.width,
                                            height: item['media:content'][0].$.height
                                        };
                                    }
                                    addPromised.push(News.create(newNews));
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
                                    const item = items[index];
                                    addPromised.push(News.create({
                                        source: 'National Public Radio',
                                        title: item.title[0],
                                        link: item.link[0],
                                        pubDate: item.pubDate[0],
                                        description: item.description[0],
                                        content: item['content:encoded'][0]
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