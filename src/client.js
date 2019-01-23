const http = require('http');
const https = require('https');

const node = require('./node');

class GrinClient {
  constructor(options) {
    let optionsCopy = {};

    if (typeof options === 'object') {
      optionsCopy = Object.assign({}, options);
    }

    this.protocol = optionsCopy.protocol;
    this.username = optionsCopy.username;
    this.password = optionsCopy.password;
    this.hostname = optionsCopy.hostname;
    this.port = optionsCopy.port;
    this.agent;

    if (this.protocol === 'https') {
      this.agent = https;
    } else {
      this.agent = http;
    }
  }

  blocks(param) {
    return node.blocks(this, param);
  }

  headers(param) {
    return node.headers(this, param);
  }

  chain() {
    return node.chain(this);
  }

  status() {
    return node.status(this);
  }

  txhashsetRoots() {
    return node.txhashsetRoots(this);
  }

  txhashsetLastOutputs(n) {
    return node.txhashsetLastOutputs(this, n);
  }

  txhashsetLastRangeProofs(n) {
    return node.txhashsetLastRangeProofs(this, n);
  }

  txhashsetLastKernels(n) {
    return node.txhashsetLastKernels(this, n);
  }

  txhashsetOutPuts(params) {
    return node.txhashsetOutPuts(this, params);
  }

  txhashsetMerkleProof(id) {
    return node.txhashsetMerkleProof(this, id);
  }

  pool() {
    return node.pool(this);
  }

  peersAll() {
    return node.peersAll(this);
  }

  peersConnected() {
    return node.peersConnected(this);
  }

  peers(addr) {
    return node.peers(this, addr);
  }
}

module.exports = GrinClient;
