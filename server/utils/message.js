// Function: takes input and creates message object
let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

/* EXPORTS */
module.exports = {generateMessage};
