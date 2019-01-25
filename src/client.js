const node = require('./node');

class GrinClient {
  constructor(options) {
    let optionsCopy = {};

    if (typeof options === 'object') {
      optionsCopy = Object.assign({}, options);
    }

    this.options = {};
    this.options.protocol = optionsCopy.protocol;
    this.options.host = optionsCopy.host;
    this.options.hostname = optionsCopy.hostname;
    this.options.port = optionsCopy.port;
    this.options.headers = optionsCopy.headers;
    this.options.auth = `${optionsCopy.username}:${optionsCopy.password}`;
  }

  blocks(param) {
    return node.blocks(this.options, param);
  }

  headers(param) {
    return node.headers(this.options, param);
  }

  chain() {
    return node.chain(this.options);
  }

  chainCompact() {
    return node.chainCompact(this.options);
  }

  chainValidate() {
    return node.chainValidate(this.options);
  }

  chainOutputsByIds(ids) {
    return node.chainOutputsByIds(this.options, ids);
  }

  chainOutputsByHeight(params) {
    return node.chainOutputsByHeight(this.options, params);
  }

  status() {
    return node.status(this.options);
  }

  txhashsetRoots() {
    return node.txhashsetRoots(this.options);
  }

  txhashsetLastOutputs(n) {
    return node.txhashsetLastOutputs(this.options, n);
  }

  txhashsetLastRangeProofs(n) {
    return node.txhashsetLastRangeProofs(this.options, n);
  }

  txhashsetLastKernels(n) {
    return node.txhashsetLastKernels(this.options, n);
  }

  txhashsetOutPuts(params) {
    return node.txhashsetOutPuts(this.options, params);
  }

  txhashsetMerkleProof(id) {
    return node.txhashsetMerkleProof(this.options, id);
  }

  pool() {
    return node.pool(this.options);
  }

  // poolPush(params) {
  //   return node.poolPush(this.options, params);
  // }

  peersBan(addr) {
    return node.peersBan(this.options, addr);
  }

  peersUnban(addr) {
    return node.peersUnban(this.options, addr);
  }

  peersAll() {
    return node.peersAll(this.options);
  }

  peersConnected() {
    return node.peersConnected(this.options);
  }

  peers(addr) {
    return node.peers(this.options, addr);
  }
}

module.exports = GrinClient;
