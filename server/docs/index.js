const basicInfo = require('./basicInfo');
const bookmarks = require('./bookmarks');
const tags = require('./tags');

module.exports = {
    ...basicInfo,
    ...bookmarks,
    ...tags
};