const moment = require('moment');

/**
 * Takes input and creates message a object
 *
 * @param {string} from
 * @param {string} text
 * @param {string} color
 * @returns
 */
function generateMessage(from, text, color) {
    return {
        from,
        text,
        color,
        createdAt: moment().valueOf()
    };
}

/**
 * Generate a location message
 *
 * @param {string} from
 * @param {string} lat
 * @param {string} long
 * @returns
 */
function generateLocationMessage(from, lat, long) {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    };
}

/* EXPORTS */
module.exports = {generateMessage, generateLocationMessage};
