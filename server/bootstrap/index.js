const path = require('path');
const Redis = require('ioredis');

/*
|-------------------------------------------------------------------------------
| Environment Variables
|-------------------------------------------------------------------------------
|
| Some environment variables must have defaults set, and others must be set
| during runtime. Those variables are defined here.
|
*/
process.env.REDIS_URL = process.env.REDIS_URL || 'redis://:@localhost:6379';
process.env.USER_DB = process.env.USER_DB || 1;
process.env.SERVER_DIR = path.join(__dirname, '..');
process.env.ROOT_DIR = path.join(__dirname, '..', '..');

/*
|-------------------------------------------------------------------------------
| Clean up Redis
|-------------------------------------------------------------------------------
|
| When the application reboots, all keys for storing tracking users should be
| deleted, to ensure that users are not locked out of the room with the given
| username.
|
*/
const redis = new Redis(`${process.env.REDIS_URL}/${process.env.USER_DB}`);

redis.flushall();
