const News = require("../models/news").News;
const parseString = require("xml2js").parseString;
const https = require("https");

const getNewsFeed = function(src) {
  if (src === "google") {
    return {
      host: "news.google.com",
      port: "443",
      path: "/rss/topics/CAAqBwgKMJej0wEwpcY1?hl=en-US&gl=US&ceid=US:en",
      method: "GET",
      timeout: 10000
    };
  } else if (src === "npr") {
    return {
      host: "www.npr.org",
      port: "443",
      path: "/rss/rss.php?id=127600895",
      method: "GET",
      timeout: 10000
    };
  }

  return null;
};

module.exports.syncNews = function(successHandler, errorHandler) {
  const googleNewsPromise = new Promise((resolve, reject) => {
    // Set up the request
    const post_req = https.request(getNewsFeed("google"), post_req_res => {
      let xmlStr = "";
      post_req_res.setEncoding("utf8");
      post_req_res.on("data", chunk => {
        xmlStr += chunk;
      });
      post_req_res.on("end", () => {
        parseString(xmlStr, (err, result) => {
          const findPromises = [];
          const items = result.rss.channel[0].item;
          items.forEach(value => {
            findPromises.push(
              News.findOne({
                title: value.title[0]
              })
            );
          });
          Promise.all(findPromises).then(values => {
            const addPromised = [];
            for (let index = 0; index < values.length; index++) {
              const element = values[index];
              if (!element) {
                const item = items[index];
                const newNews = {
                  source: "Google News",
                  title: item.title[0],
                  link: item.link[0],
                  pubDate: item.pubDate[0],
                  description: item.description[0]
                  // category: item.category[0]
                };
                if (item["media:content"] && item["media:content"][0]) {
                  newNews.mediaContent = {
                    url: item["media:content"][0].$.url,
                    medium: item["media:content"][0].$.medium,
                    width: item["media:content"][0].$.width,
                    height: item["media:content"][0].$.height
                  };
                }
                addPromised.push(News.create(newNews));
              }
            }
            Promise.all(addPromised)
              .then(newNews => resolve(newNews))
              .catch(e => reject(e));
          });
        });
      });
    });

    post_req.on("error", e => {
      reject(e);
    });
    post_req.end();
  });

  const nationaPublicRadioNewsPromise = new Promise((resolve, reject) => {
    // Set up the request
    const post_req = https.request(getNewsFeed("npr"), post_req_res => {
      let xmlStr = "";
      post_req_res.setEncoding("utf8");
      post_req_res.on("data", chunk => {
        xmlStr += chunk;
      });
      post_req_res.on("end", () => {
        parseString(xmlStr, (err, result) => {
          const findPromises = [];
          const items = result.rss.channel[0].item;
          items.forEach(value => {
            findPromises.push(
              News.findOne({
                title: value.title[0]
              })
            );
          });
          Promise.all(findPromises).then(values => {
            const addPromised = [];
            for (let index = 0; index < values.length; index++) {
              const element = values[index];
              if (!element) {
                const item = items[index];
                addPromised.push(
                  News.create({
                    source: "National Public Radio",
                    title: item.title[0],
                    link: item.link[0],
                    pubDate: item.pubDate[0],
                    description: item.description[0],
                    content: item["content:encoded"][0]
                  })
                );
              }
            }
            Promise.all(addPromised)
              .then(newNews => resolve(newNews))
              .catch(e => reject(e));
          });
        });
      });
    });

    post_req.on("error", e => {
      reject(e);
    });
    post_req.end();
  });

  Promise.all([googleNewsPromise, nationaPublicRadioNewsPromise])
    .then(data => {
      console.log("Syncing news feeds done.");
      if (successHandler) {
        successHandler();
      }
    })
    .catch(e => {
      console.error(e);
      if (errorHandler) {
        errorHandler();
      }
    });
};
