const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookmark'
        }
    ]
});

module.exports = mongoose.model('Tag',TagSchema)