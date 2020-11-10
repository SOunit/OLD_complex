// check redis
// calc

const keys = require('./keys');
const redis = require('redis');

// create client
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

// calc num
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// check redis
sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});

// check redis
sub.subscribe('insert');
