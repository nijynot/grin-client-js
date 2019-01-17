const http = require('http')
const https = require('https')

class Request {
  constructor(options) {
    this.protocol = options.protocol;
    this.host = options.host;
    this.port = options.port;
    this.user = options.user;
    this.password = options.password;
    this.agent;

    if (this.protocol === 'https') {
      this.agent = https;
    } else {
      this.agent = http;
    }
  }

  block(param) {
    return new Promise((resolve, reject) => {
      this.agent.get(`${this.protocol}://${this.host}:${this.port}/v1/blocks/${param}`, {
        auth: `${this.user}:${this.password}`,
      }, (res) => {
        const { statusCode } = res;

        let error;
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
                            reject(error);
        }

        if (error) {
          console.error(error.message);
          // consume response data to free up memory
          res.resume();
          return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      });
    });
  }
}

module.exports = Request;
