const url = require('url');
const querystring = require('querystring');
const https = require('https');
const http = require('http');

function response(resolve, reject) {
  return (res) => {
    let error;
    if (res.statusCode !== 200) {
      error = new Error('Request Failed.\n' + `Status Code: ${res.statusCode}`);
      reject(error);
    }

    console.log(res.statusCode);

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        resolve(JSON.parse(rawData));
      } catch (e) {
        reject(e.message);
      }
    });
  }
}

function request(options) {
  return new Promise((resolve, reject) => {
    const agent = (options.protocol === 'https') ? https : http;
    const optionsCopy = Object.assign({}, options);

    optionsCopy.protocol = (optionsCopy.protocol && optionsCopy.protocol + ':') || 'http:';

    const req = agent.request(optionsCopy, response(resolve, reject));
    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
    });
    req.end();
  });
}

module.exports = {
  request,
  response,
};
