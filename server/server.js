/* NODE MODULES */
const path = require('path');
const express = require('express');

/* GLOBAL VARIABLES */
const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
/* EXPRESS SERVER */
let app = express();

// configure middleware
app.use(express.static(publicPath));

// set port for app
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
