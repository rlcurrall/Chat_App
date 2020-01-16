// Include Styles
require('./css/styles.css');

// Include JS modules to export
const chat = require('./js/chat');

module.exports = {
    ...chat,
};
