const querystring = require('querystring');
const url = require('url');

const request = require('../utils/request');
const { responseJson, responseStatus } = require('../utils/common')

/**
 * GET Retrieve Outputs
 * @param {Object} config
 * @param {Object} params
 * @param {bool} options.refresh
 * @param {bool} options.showSpent
 * @param {Array|string} options.txIds
 * @returns {Promise.<Object>}
 */
function retrieveOutputs(config, options) {
  const optionsCopy = {};
  if (options.refresh) optionsCopy.refresh = options.refresh;
  if (options.showSpent) optionsCopy.show_spent = options.showSpent;
  if (options.txIds) optionsCopy.tx_id = options.txIds;

  return request(url.format({
    ...config.url,
    pathname: `/v1/wallet/owner/retrieve_outputs`,
    query: optionsCopy,
  }), {
    method: 'GET',
    headers: {
      ...config.headers,
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
  const paramsCopy = {};
  if (params.refresh) paramsCopy.refresh = params.refresh;

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
function nodeHeight(options, params) {
  const paramsCopy = {};
  if (params.refresh) paramsCopy.refresh = params.refresh;

  return request(url.format({
    ...options.url,
    pathname: `/v1/wallet/owner/node_height`,
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
 * GET Retrieve Txs
 * @param {Object} options
 * @param {Object} params
 * @param {bool} params.refresh
 * @param {number} params.id
 * @param {string} params.txId
 * @returns {Promise.<Object>}
 */
function retreiveTxs(options, params) {
  const paramsCopy = {};
  if (params.refresh) paramsCopy.refresh = params.refresh;
  if (params.id) paramsCopy.id = params.id;
  if (params.txId) paramsCopy.tx_id = params.txId;

  return request(url.format({
    ...options.url,
    pathname: `/v1/wallet/owner/retrieve_txs`,
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
 * GET Retrieve Stored Tx
 * @param {Object} options
 * @param {number} id
 * @returns {Promise.<Object>}
 */
function retreiveStoredTx(options, id) {
  if (typeof id !== 'number') {
    return Promise.reject(new Error(`Expected \`id\` to be a number, but got: ${id}`));
  }

  const paramsCopy = Object.assign({}, { id });

  return request(url.format({
    ...options.url,
    pathname: `/v1/wallet/owner/retrieve_stored_tx`,
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
 * POST Issue Send Tx
 * @param {Object} options
 * @param {Object} params
 * @param {number} params.amount - Amount to send
 * @param {number} params.minimumConfirmations - Minimum confirmations
 * @param {string} params.method - Payment method
 * @param {string} params.dest - Destination url
 * @param {number} params.maxOutputs - Max number of outputs
 * @param {number} params.numChangeOutputs - Number of change outputs to generate
 * @param {bool} params.selectionStrategyIsUseAll - Whether to use all outputs (combine)
 * @returns {Promise.<Object>}
 */
function issueSendTx(options, params) {
  const {
    amount,
    minimumConfirmations,
    method,
    dest,
    maxOutputs,
    numChangeOutputs,
    selectionStrategyIsUseAll,
  } = params;

  if (
    typeof amount === undefined ||
    typeof minimumConfirmations === undefined ||
    typeof method === undefined ||
    typeof dest === undefined ||
    typeof maxOutputs === undefined ||
    typeof numChangeOutputs === undefined ||
    typeof selectionStrategyIsUseAll === undefined
  ) {
    return Promise.reject(new Error('Missing argument(s)'));
  }

  if (amount < 0 || minimumConfirmations < 0 || maxOutputs < 0|| numChangeOutputs < 0) {
    const { value, key } = _.find({ amount, minimumConfirmations, maxOutputs, numChangeOutputs }, (value, key) => {
      if (value < 0) return { value, key };
    });
    return Promise.reject(
      new TypeError(`Expected positive number \`${key}\` but got: ${value}.`);
    );
  }

  const paramsCopy = Object.assign({}, params);

  return request(url.format({
    ...options.url,
    pathname: `/v1/wallet/owner/issue_send_tx`,
  }), {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(paramsCopy),
  })
  .then(responseJson());
}

/**
 * POST Finalize Tx
 * @param {Object} config
 * @param {Object} options
 * @param {Object} options.slate - A transaction slate in JSON
 * @returns {Promise.<Object>}
 */
function finalizeTx(config, options) {
  if (typeof options.slate !== 'object') {
    return Promise.reject(
      new TypeError(`Expected \`slate\` to be an object, but got: ${options.slate}`)
    );
  }

  const { slate } = options;
  const slateCopy = Object.assign({}, slate);

  return request(url.format({
    ...config.url,
    pathname: `/v1/wallet/owner/finalize_tx`,
  }), {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify(slateCopy),
  })
  .then(responseJson());
}

/**
 * POST Cancel Tx
 * @param {Object} config
 * @param {Object} options
 * @param {number} options.id - the transaction id
 * @param {string} options.txId - the transaction slate id
 * @returns {Promise.<Object>}
 */
function cancelTx(config, options) {
  if (typeof options.id !== 'number' && typeof options.txId !== 'string') {
    return Promise.reject(
      new TypeError(`Expected \`id\` to a number or \`txId\` to be a string, but got: ${options}`)
    );
  }

  const optionsCopy = {};
  if (options.id) {
    optionsCopy.id = options.id;
  } else {
    optionsCopy.tx_id = options.txId;
  }

  return request(url.format({
    ...config.url,
    pathname: `/v1/wallet/owner/cancel_tx`,
    query: optionsCopy,
  }), {
    method: 'POST',
    headers: {
      ...config.headers,
    },
  })
  .then(responseJson());
}

/**
 * POST Post Tx
 * @param {Object} config
 * @param {Object} options
 * @param {number} options.fluff - the transaction id
 * @param {number} options.slate - a transaction slate
 * @returns {Promise.<Object>}
 */
function postTx(config, options) {
  if (typeof options.slate !== 'object') {
    return Promise.reject(
      new TypeError(`Expected \`slate\` to be an object, but got: ${options.slate}`)
    );
  }

  const optionsCopy = {};
  if (options.fluff) optionsCopy.fluff = true;

  return request(url.format({
    ...config.url,
    pathname: `/v1/wallet/owner/post_tx`,
    query: optionsCopy,
  }), {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify(options.slate),
  })
  .then(responseJson());
}

/**
 * POST Repost Tx
 * @param {Object} config
 * @param {Object} options
 * @param {number} options.fluff - the transaction id
 * @param {number} options.id - the transaction id
 * @param {string} options.txId - the transaction slate id
 * @returns {Promise.<Object>}
 */
function repostTx(config, options) {
  if (typeof options.id !== 'number' && typeof options.txId !== 'string') {
    return Promise.reject(
      new TypeError(`Expected \`id\` to a number or \`txId\` to be a string, but got: ${options}`)
    );
  }

  const optionsCopy = {};
  if (options.fluff) optionsCopy.fluff = true;
  if (options.id) {
    optionsCopy.id = options.id;
  } else {
    optionsCopy.tx_id = options.txId;
  }

  return request(url.format({
    ...config.url,
    pathname: `/v1/wallet/owner/repost`,
    query: optionsCopy,
  }), {
    method: 'POST',
    headers: {
      ...config.headers,
    },
  })
  .then(responseJson());
}

/**
 * POST Issue Burn Tx
 * @param {Object} config
 * @returns {Promise.<Object>}
 */
function issueBurnTx(config) {
  return request(url.format({
    ...config.url,
    pathname: `/v1/wallet/owner/issue_burn_tx`,
  }), {
    method: 'POST',
    headers: {
      ...config.headers,
    },
  })
  .then(responseJson());
}

module.exports = {
  retrieveOutputs,
  retrieveSummaryInfo,
  nodeHeight,
  retreiveTxs,
  retreiveStoredTx,
  issueSendTx,
  finalizeTx,
  cancelTx,
  postTx,
  repostTx,
  issueBurnTx,
};
