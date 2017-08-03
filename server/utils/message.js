const moment = require('moment');

// Function: takes input and creates message object
let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

// Function:
let generateLocationMessage = (from, lat, long) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt: moment().valueOf()
  };
};

/* EXPORTS */
module.exports = {generateMessage, generateLocationMessage};
