const url = require('url');
const querystring = require('querystring');
const https = require('https');
const http = require('http');

function response(resolve, reject) {
  return (res) => {
    let error;
    if (res.statusCode !== 200) {
      error = new Error('Request Failed. ' + `Status Code: ${res.statusCode}`);
      reject(error);
    }

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

function responseCode(resolve, reject) {
  return (res) => {
    let error;
    if (res.statusCode !== 200) {
      error = new Error('Request Failed. ' + `Status Code: ${res.statusCode}`);
      reject(error);
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        resolve(res.statusCode);
      } catch (e) {
        reject(e.message);
      }
    });
  }
}

function request(options, cb) {
  return new Promise((resolve, reject) => {
    const agent = (options.protocol === 'https') ? https : http;
    const cbCopy = (typeof cb === 'function') ? cb : response;
    const optionsCopy = Object.assign({}, options);

    optionsCopy.protocol = (optionsCopy.protocol && optionsCopy.protocol + ':') || 'http:';

    const req = agent.request(optionsCopy, cbCopy(resolve, reject));
    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
    });
    req.end();
  });
}

module.exports = {
  request,
  response,
  responseCode,
};
