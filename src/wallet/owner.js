const querystring = require('querystring');
const url = require('url');

const request = require('../utils/request');
const { responseJson, responseStatus } = require('../utils/common')

/**
 * GET Retrieve Outputs
 * @param {Object} options
 * @param {Object} params
 * @param {bool} params.refresh
 * @param {bool} params.showSpent
 * @param {Array|string} params.txIds
 * @returns {Promise.<Object>}
 */
function retrieveOutputs(options, params) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/wallet/owner/retrieve_outputs`,
    query: {
      refresh: params.refresh,
      show_epsnt: params.showSpent,
      tx_id: params.txIds,
    },
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET Retrieve Summary Info
 * @param {Object} options
 * @param {Object} params
 * @param {bool} params.refresh
 * @returns {Promise.<Object>}
 */
function retrieveSummaryInfo(options, params) {
  const paramsCopy = Object.assign({}, params);
  if (!paramsCopy.refresh) delete paramsCopy.refresh;

  return request(url.format({
    ...options.url,
    pathname: `/v1/wallet/owner/retrieve_summary_info`,
    query: paramsCopy,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET Node Height
 * @param {Object} options
 * @param {Object} params
 * @param {bool} params.refresh
 * @returns {Promise.<Object>}
 */
function nodeHeight(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/wallet/owner/node_height`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET Retrieve Txs
 * @param {Object} options
 * @param {Object} params
 * @param {bool} params.refresh
 * @param {number} params.id
 * @param {string} params.txId
 * @returns {Promise.<Object>}
 */
function retreiveTxs(options, params) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/wallet/owner/retrieve_txs`,
    query: {
      refresh: params.refresh,
      id: params.id,
      tx_id: params.txId
    },
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

module.exports = {
  retrieveOutputs,
  retrieveSummaryInfo,
  nodeHeight,
  retreiveTxs,
};
