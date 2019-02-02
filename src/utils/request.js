const url = require('url');
const querystring = require('querystring');

let env;
if (typeof window !== 'undefined') {
  env = 'browser';
} else {
  env = 'node';
}

if (env === 'node') {
  module.exports = require('./fetch');
} else {
  module.exports = require('whatwg-fetch');
}
