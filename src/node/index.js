const querystring = require('querystring');
const url = require('url');

const request = require('../utils/request');
const { responseJson, responseStatus } = require('../utils/common')

/**
 * GET Blocks
 * @param {Object} options
 * @param {string|number} param - Hash, height or commit
 * @returns {Promise.<Object>}
 */
function blocks(options, param) {
  if (typeof param !== 'array') {
    return request(url.format({
      ...options.url,
      pathname: `/v1/blocks/${param}`,
    }), {
      method: 'GET',
      headers: {
        ...options.headers,
      },
    })
    .then(responseJson());
  }
}

/**
 * GET Headers
 * @param {Object} options
 * @param {string|number} param - Hash, height or commit
 * @returns {Promise.<Object>}
 */
function headers(options, param) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/headers/${param}`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET Chain
 * @param {Object} options
 * @returns {Promise.<Object>}
 */
function chain(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/chain`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * POST Chain Compact
 * @param {Object} options
 * @returns {Promise.<Object>}
 */
function chainCompact(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/chain/compact`,
  }), {
    method: 'POST',
    headers: {
      ...options.headers,
    },
  })
  .then(responseStatus());
}

/**
 * POST Chain Validate
 * @param {Object} options
 * @returns {Promise.<Object>}
 */
function chainValidate(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/chain/validate`,
  }), {
    method: 'POST',
    headers: {
      ...options.headers,
    },
  })
  .then(responseStatus());
}

/**
 * GET Chain Outputs By IDs
 * @param {Object} options
 * @param {Array|string} ids
 * @returns {Promise.<Object>}
 */
function chainOutputsByIds(options, ids) {
  const search = { id: ids };
  return request(url.format({
    ...options.url,
    pathname: `/v1/chain/outputs/byids`,
    query: {
      id: ids,
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
 * GET Chain Outputs By Height
 * @param {Object} options
 * @param {Object} params
 * @param {number} params.startHeight
 * @param {number} params.endHeight
 * @returns {Promise.<Object>}
 */
function chainOutputsByHeight(options, params) {
  const search = {
    start_height: params.startHeight,
    end_height: params.endHeight,
  };
  return request(url.format({
    ...options.url,
    pathname: `/v1/chain/outputs/byheight`,
    query: search,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET Status
 * @param {Object} options
 * @returns {Promise.<Object>}
 */
function status(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/status`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET TxHashSet Roots
 * @param {Object} options
 */
function txhashsetRoots(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/txhashset/roots`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET TxHashSet Last Outputs
 * @param {Object} options
 * @param {number} n
 */
function txhashsetLastOutputs(options, n) {
  const search = { n: n };
  return request(url.format({
    ...options.url,
    pathname: `/v1/txhashset/lastoutputs`,
    query: search,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET TxHashSet Last Range Proofs
 * @param{Object} options
 * @param{number} n
 */
function txhashsetLastRangeProofs(options, n) {
  const search = { n: n };
  return request(url.format({
    ...options.url,
    pathname: `/v1/txhashset/lastrangeproofs`,
    query: search,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET TxHashSet Last Kernels
 * @param {Object} options
 * @param {number} n
 */
function txhashsetLastKernels(options, n) {
  const search = { n: n };
  return request(url.format({
    ...options.url,
    pathname: `/v1/txhashset/lastkernels`,
    query: search,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET TxHashSet Outputs
 * @param {Object} options
 * @param {Object} params
 * @param {number} params.startIndex
 * @param {number} params.max
 */
function txhashsetOutputs(options, params) {
  const search = {
    start_index: params.startIndex,
    max: params.max,
  };
  return request(url.format({
    ...options.url,
    pathname: `/v1/txhashset/outputs`,
    query: search,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET TxHashSet Merkle Proof
 * @param {Object} options
 * @param {string} id
 */
function txhashsetMerkleProof(options, id) {
  const search = { id: id };
  return request(url.format({
    ...options.url,
    pathname: `/v1/txhashset/merkleproof`,
    query: search,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET Pool
 * @param {Object} options
 */
function pool(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/pool`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * POST Pool Push
 * @param {Object} options
 * @param {Object} params
 * @param {string} file - hex encoded transaction
 * @param {bool} params.fluff - Adds ?fluff at the end of the URL to bypass Dandelion relay.
 */
function poolPush(options, params) {
  // TODO: Implement file data param and fluff
  // const fluff = (params.fluff) ? 'fluff' : '';
  // const data = { file: params.file };
  // return request({
  //   ...options,
  //   method: 'POST',
  //   path: `/v1/pool/push`,
  // });
  return;
}

/**
 * POST Peers Ban
 * @param {Object} options
 * @param {string} addr
 */
function peersBan(options, addr) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/peers/${addr}/ban`,
  }), {
    method: 'POST',
    headers: {
      ...options.headers,
    },
  })
  .then(responseStatus());
}

/**
 * POST Peers Unban
 * @param {Object} options
 * @param {string} addr
 */
function peersUnban(options, addr) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/peers/${addr}/unban`,
  }), {
    method: 'POST',
    headers: {
      ...options.headers,
    },
  })
  .then(responseStatus());
}

/**
 * GET Peers All
 * @param {Object} options
 */
function peersAll(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/peers/all`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET Peers Connected
 * @param {Object} options
 */
function peersConnected(options) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/peers/connected`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

/**
 * GET Peers
 * @param {Object} options
 * @param {string} addr - Network address of the peer, a.b.c.d
 */
function peers(options, addr) {
  return request(url.format({
    ...options.url,
    pathname: `/v1/peers/${addr}`,
  }), {
    method: 'GET',
    headers: {
      ...options.headers,
    },
  })
  .then(responseJson());
}

module.exports = {
  blocks,
  headers,
  chain,
  chainCompact,
  chainValidate,
  chainOutputsByIds,
  chainOutputsByHeight,
  status,
  txhashsetRoots,
  txhashsetLastOutputs,
  txhashsetLastRangeProofs,
  txhashsetLastKernels,
  txhashsetOutputs,
  txhashsetMerkleProof,
  pool,
  poolPush,
  peersBan,
  peersUnban,
  peersAll,
  peersConnected,
  peers,
};
