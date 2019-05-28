const News = require("../../models/news").News;
const newsSvc = require("../../service/news-service");
const utils = require("../../../lib/utils");

module.exports.newsList = function(req, res) {
  News.find({})
    .limit(50)
    .sort("-pubDate")
    .exec(function(err, results, stats) {
      if (err) {
        utils.sendJsonResponse(res, 400, err);
      } else {
        utils.sendJsonResponse(res, 200, results);
      }
    });
};

module.exports.newsListSearchByTitle = function(req, res) {
  if (req.params && req.params.keywords) {
    const keyWords = req.params.keywords
      .replace(" ", "|")
      .replace("\\", "\\\\");
    const regex = new RegExp(keyWords, "i");
    News.find({
      title: regex
    })
      .sort("-pubDate")
      .exec(function(err, results, stats) {
        if (err) {
          utils.sendJsonResponse(res, 400, err);
        } else {
          utils.sendJsonResponse(res, 200, results);
        }
      });
  } else {
    utils.sendJsonResponse(res, 400, {
      message: "No key word."
    });
  }
};

module.exports.refreshNewsFromFeeds = function(req, res) {
  try {
    newsSvc.syncNews(
      () => {
        utils.sendJsonResponse(res, 200, data);
      },
      () => {
        utils.sendJsonResponse(res, 400, {
          message: e.message
        });
      }
    );
  } catch (e) {
    console.error(e.message);
    utils.sendJsonResponse(res, 400, {
      message: "cannot parse news feed."
    });
  }
};
