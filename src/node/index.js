const querystring = require('querystring');

const { request, responseCode } = require('../utils/request');

/**
 * GET Blocks
 * @param {Object} options
 * @param {string|number} param - Hash, height or commit
 */
function blocks(options, param) {
  if (typeof param !== 'array') {
    return request({
      ...options,
      method: 'GET',
      path: `/v1/blocks/${param}`,
    });
  }
}

/**
 * GET Headers
 * @param {Object} options
 * @param {string|number} param - Hash, height or commit
 */
function headers(options, param) {
  return request({
    ...options,
    method: 'GET',
    path: `/v1/headers/${param}`,
  });
}

/**
 * GET Chain
 * @param {Object} options
 */
function chain(options) {
  return request({
    ...options,
    method: 'GET',
    path: `/v1/chain`,
  });
}

/**
 * POST Chain Compact
 * @param {Object} options
 */
function chainCompact(options) {
  return request({
    ...options,
    method: 'POST',
    path: `/v1/chain/compact`,
  }, responseCode);
}

/**
 * POST Chain Validate
 * @param {Object} options
 */
function chainValidate(options) {
  return request({
    ...options,
    method: 'POST',
    path: `/v1/chain/validate`,
  }, responseCode);
}

/**
 * GET Chain Outputs By IDs
 * @param {Object} options
 * @param {Array|string} ids
 */
function chainOutputsByIds(options, ids) {
  const search = { id: ids };
  return request({
    ...options,
    method: 'GET',
    path: `/v1/chain/outputs/byids?${querystring.stringify(search)}`,
  });
}

/**
 * GET Chain Outputs By Height
 * @param {Object} options
 * @param {Object} params
 * @param {number} params.startHeight
 * @param {number} params.endHeight
 */
function chainOutputsByHeight(options, params) {
  const search = {
    start_height: params.startHeight,
    end_height: params.endHeight,
  };
  return request({
    ...options,
    method: 'GET',
    path: `/v1/chain/outputs/byheight?${querystring.stringify(search)}`,
  });
}

/**
 * GET Status
 * @param {Object} options
 */
function status(options) {
  return request({
    ...options,
    method: 'GET',
    path: `/v1/status`,
  });
}

/**
 * GET TxHashSet Roots
 * @param {Object} options
 */
function txhashsetRoots(options) {
  return request({
    ...options,
    method: 'GET',
    path: `/v1/txhashset/roots`,
  });
}

/**
 * GET TxHashSet Last Outputs
 * @param {Object} options
 * @param {number} n
 */
function txhashsetLastOutputs(options, n) {
  const search = { n: n };
  return request({
    ...options,
    method: 'GET',
    path: `/v1/txhashset/lastoutputs?${querystring.stringify(search)}`,
  });
}

/**
 * GET TxHashSet Last Range Proofs
 * @param{Object} options
 * @param{number} n
 */
function txhashsetLastRangeProofs(options, n) {
  const search = { n: n };
  return request({
    ...options,
    method: 'GET',
    path: `/v1/txhashset/lastrangeproofs?${querystring.stringify(search)}`,
  });
}

/**
 * GET TxHashSet Last Kernels
 * @param {Object} options
 * @param {number} n
 */
function txhashsetLastKernels(options, n) {
  const search = { n: n };
  return request({
    ...options,
    method: 'GET',
    path: `/v1/txhashset/lastkernels?${querystring.stringify(search)}`,
  });
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
  return request({
    ...options,
    method: 'GET',
    path: `/v1/txhashset/outputs?${querystring.stringify(search)}`,
  });
}

/**
 * GET TxHashSet Merkle Proof
 * @param {Object} options
 * @param {string} id
 */
function txhashsetMerkleProof(options, id) {
  const search = { id: id };
  return request({
    ...options,
    method: 'GET',
    path: `/v1/txhashset/merkleproof?${querystring.stringify(search)}`,
  });
}

/**
 * GET Pool
 * @param {Object} options
 */
function pool(options) {
  return request({
    ...options,
    method: 'GET',
    path: `/v1/pool`,
  });
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
  return request({
    ...options,
    method: 'POST',
    path: `/v1/pool/push`,
  });
}

/**
 * POST Peers Ban
 * @param {Object} options
 * @param {string} addr
 */
function peersBan(options, addr) {
  return request({
    ...options,
    method: 'POST',
    path: `/v1/peers/${addr}/ban`,
  }, responseCode);
}

/**
 * POST Peers Unban
 * @param {Object} options
 * @param {string} addr
 */
function peersUnban(options, addr) {
  return request({
    ...options,
    method: 'POST',
    path: `/v1/peers/${addr}/unban`,
  }, responseCode);
}

/**
 * GET Peers All
 * @param {Object} options
 */
function peersAll(options) {
  return request({
    ...options,
    method: 'GET',
    path: `/v1/peers/all`,
  });
}

/**
 * GET Peers Connected
 * @param {Object} options
 */
function peersConnected(options) {
  return request({
    ...options,
    method: 'GET',
    path: `/v1/peers/connected`,
  });
}

/**
 * GET Peers
 * @param {Object} options
 * @param {string} addr - Network address of the peer, a.b.c.d
 */
function peers(options, addr) {
  return request({
    ...options,
    method: 'GET',
    path: `/v1/peers/${addr}`,
  });
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
