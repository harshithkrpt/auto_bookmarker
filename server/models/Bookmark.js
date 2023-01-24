const mongoose = require('mongoose');

const bookmarks = new mongoose.Schema({
    currentBookmarkValue: {
        required: true,
        type: String
    },
    tags: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }
});


module.exports = mongoose.model('Bookmark',bookmarks);