const url = require('url');

const node = require('./node');
const { foreign, owner } = require('./wallet');
const { base64 } = require('./utils/common')

class GrinClient {
  constructor(options) {
    let optionsCopy = {};

    if (typeof options === 'object') {
      optionsCopy = Object.assign({}, options);
    }

    this.options = { url: {} };
    this.options.url.protocol = optionsCopy.protocol;
    this.options.url.hostname = optionsCopy.hostname;
    this.options.url.host = optionsCopy.host;
    this.options.url.port = optionsCopy.port;
    this.options.headers = {
      ...optionsCopy.headers,
      'Authorization': 'Basic ' + base64(`${optionsCopy.username}:${optionsCopy.password}`),
    };

    this.wallet = {};
    this.wallet.retrieveSummaryInfo = this._retrieveSummaryInfo.bind(this);
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

  txhashsetOutputs(params) {
    return node.txhashsetOutputs(this.options, params);
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

  _retrieveSummaryInfo() {
    return owner.retrieveSummaryInfo(this.options, {});
  }
}

module.exports = GrinClient;
