const cron = require("node-cron");
const newsSvc = require("./server/service/news-service");

const refreshNewsFromFeeds = function(req, res) {
  try {
    newsSvc.syncNews(null, null);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports.start = function() {
  cron.schedule("*/5 * * * *", function() {
    console.log("Syncing news feeds...");
    refreshNewsFromFeeds();
  });
};
