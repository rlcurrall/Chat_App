const moment = require('moment');

/*
let date = moment();
date.subtract(1, 'month');
console.log(date.format('MMM Do, Y'));
*/

let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1234567890;
let time = moment(createdAt);
console.log(time.format('h:mm a'));
