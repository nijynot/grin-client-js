const url = require('url');
const querystring = require('querystring');

function format(options) {
  if (!options.hostname) {
    throw new Error('No host specified.');
  }

  let search = '';
  if (options.search) {
    search = '?' + querystring.stringify(options.search);
  }

  const nodeUrl = url.parse(
    `${options.protocol}://${options.hostname}:${options.port}${options.pathname}${search}`
  );

  console.log(nodeUrl.href);

  return nodeUrl.href;
}

function response(resolve, reject) {
  return (res) => {
    let error;
    if (res.statusCode !== 200) {
      error = new Error('Request Failed.\n' + `Status Code: ${res.statusCode}`);
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

module.exports = {
  format,
  response,
};
