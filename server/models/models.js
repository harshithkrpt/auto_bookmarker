const mongoose = require('mongoose');

const bookmarks = new mongoose.Schema({
    currentBookmarkValue: {
        required: true,
        type: String
    }
});


module.exports = mongoose.model('Bookmarks',bookmarks);