const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
const ctrlSheep = require('../controllers/sheep');
const ctrlCountries = require('../controllers/countries');
const ctrlDocuments = require('../controllers/documents');
const ctrlAuth = require('../controllers/authentication');
const ctrlAppStatus = require('../controllers/appstatus');
const ctrlIceLocator = require('../controllers/icelocator');
const ctrlNews = require('../controllers/news');
const ctrlUsers = require('../controllers/users');

// Authentication
router.post('/login', ctrlAuth.login);
router.post('/register', auth, ctrlAuth.register);

// Sheep
router.get('/sheep', auth, ctrlSheep.sheepList);
router.post('/sheep', auth, ctrlSheep.sheepCreate);
router.get('/sheep/:sheepid', auth, ctrlSheep.sheepReadOne);
router.put('/sheep', auth, ctrlSheep.sheepUpdateOne);
router.delete('/sheep', auth, ctrlSheep.sheepDeleteOne);

// Countries
router.get('/countries', auth, ctrlCountries.countryList);

// Documents
router.get('/documents', auth, ctrlDocuments.documentList);
router.get('/documents/:docname/:sheepid', auth, ctrlDocuments.documentGenerate);

// App Status
router.get('/appstatus', ctrlAppStatus.status);

// ICE Locator
router.post('/icelocator/detention', auth, ctrlIceLocator.detentionLocator);

// News
router.get('/news', ctrlNews.newsList);
router.get('/news/search/:keywords', ctrlNews.newsListSearchByTitle);
router.get('/news/refresh', auth, ctrlNews.refreshNewsFromFeeds);

// Users
router.put('/users', auth, ctrlUsers.usersUpdateOne);

module.exports = router;