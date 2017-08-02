// Function: takes input and creates message object
let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

// Function:
let generateLocationMessage = (from, lat, long) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt: new Date().getTime()
  };
};

/* EXPORTS */
module.exports = {generateMessage, generateLocationMessage};
