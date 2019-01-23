const { format, response } = require('../utils/request');
const url = require('url');

/**
 * GET Blocks
 *
 * @param{Object} options
 * @param{string|number} param - Hash, height or commit
 */
function blocks(options, param) {
  if (typeof param !== 'array') {
    return new Promise((resolve, reject) => {
      options.agent.get(
        format({ ...options, pathname: `/v1/blocks/${param}` }),
        { auth: `${options.user}:${options.password}` },
        response(resolve, reject)
      );
    });
  }
}

/**
 * GET Headers
 *
 * @param{Object} options
 * @param{string|number} param - Hash, height or commit
 */
    port: 3413,
    hostname: '127.0.0.1',
    username: 'grin',
    password: 'xHGUzK7Mxxd
function headers(options, param) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/headers/${param}` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET Chain
 *
 * @param{Object} options
 */
function chain(options) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/chain` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET Status
 *
 * @param{Object} options
 */
function status(options) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/status` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET TxHashSet Roots
 *
 * @param{Object} options
 */
function txhashsetRoots(options) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/txhashset/roots` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET TxHashSet Last Outputs
 *
 * @param{Object} options
 * @param{number} n
 */
function txhashsetLastOutputs(options, n) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/txhashset/lastoutputs`, search: { n: n } }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET TxHashSet Last Range Proofs
 *
 * @param{Object} options
 * @param{number} n
 */
function txhashsetLastRangeProofs(options, n) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/txhashset/lastrangeproofs`, search: { n: n } }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET TxHashSet Last Kernels
 *
 * @param{Object} options
 * @param{number} n
 */
function txhashsetLastKernels(options, n) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/txhashset/lastkernels`, search: { n: n } }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET TxHashSet Outputs
 *
 * @param{Object} options
 * @param{Object} params
 * @param{number} params.startIndex
 * @param{number} params.max
 */
function txhashsetOutPuts(options, params) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/txhashset/outputs`, search:
        {
          start_index: params.startIndex,
          max: params.max,
        },
      }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET TxHashSet Merkle Proof
 *
 * @param{Object} options
 * @param{string} id
 */
function txhashsetMerkleProof(options, id) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/txhashset/merkleproof`, search: { id: id } }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET Pool
 *
 * @param{Object} options
 */
function pool(options) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/pool` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET Peers All
 *
 * @param{Object} options
 */
function peersAll(options) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/peers/all` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET Peers Connected
 *
 * @param{Object} options
 */
function peersConnected(options) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/peers/connected` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

/**
 * GET Peers
 *
 * @param{Object} options
 * @param{string} addr - Network address of the peer, a.b.c.d
 */
function peers(options, addr) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/peers/${addr}` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

module.exports = {
  blocks,
  headers,
  chain,
  status,
  txhashsetRoots,
  txhashsetLastOutputs,
  txhashsetLastRangeProofs,
  txhashsetLastKernels,
  txhashsetOutPuts,
  txhashsetMerkleProof,
  pool,
  peersAll,
  peersConnected,
  peers,
};
