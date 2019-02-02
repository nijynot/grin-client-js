const querystring = require('querystring');

const { request, responseCode } = require('../utils/request');

/**
 * POST Build Coinbase
 * @param {Object} options
 * @param {string|number} param - Hash, height or commit
 */
function blocks(options, param) {
  if (typeof param !== 'array') {
    return request({
      ...options,
      method: 'POST',
      path: `/v1/wallet/foreign/build_coinbase`,
    });
  }
}
