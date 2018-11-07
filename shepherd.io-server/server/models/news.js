const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    category: String,
    pubDate: {
        type: Date,
        required: true
    },
    description: String,
    content: String
});

module.exports.News = mongoose.model('News', newsSchema);