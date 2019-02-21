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
    this.wallet.retrieveOutputs = this._retrieveOutputs.bind(this);
    this.wallet.retrieveSummaryInfo = this._retrieveSummaryInfo.bind(this);
    this.wallet.nodeHeight = this._nodeHeight.bind(this);
    this.wallet.retreiveTxs = this._retreiveTxs.bind(this);
    this.wallet.retreiveStoredTx = this._retreiveStoredTx.bind(this);
    this.wallet.issueSendTx = this._issueSendTx.bind(this);
    this.wallet.finalizeTx = this._finalizeTx.bind(this);
    this.wallet.cancelTx = this._cancelTx.bind(this);
    this.wallet.postTx = this._postTx.bind(this);
    this.wallet.repostTx = this._repostTx.bind(this);
    this.wallet.issueBurnTx = this._issueBurnTx.bind(this);
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

  _retrieveOutputs() {
    return owner.retrieveOutputs(this.options);
  }

  _retrieveSummaryInfo(options) {
    return owner.retrieveSummaryInfo(this.options, options);
  }

  _nodeHeight(options) {
    return owner.nodeHeight(this.options, options);
  }

  _retreiveTxs(options) {
    return owner.retreiveTxs(this.options, options);
  }

  _retreiveStoredTx(id) {
    return owner.retreiveStoredTx(this.options, id);
  }

  _issueSendTx(params) {
    return owner.issueSendTx(this.options, params);
  }

  _finalizeTx(options) {
    return owner.finalizeTx(this.options, options);
  }

  _cancelTx(options) {
    return owner.cancelTx(this.options, options);
  }

  _postTx(options) {
    return owner.cancelTx(this.options, options);
  }

  _repostTx(options) {
    return owner.repostTx(this.options, options);
  }

  _issueBurnTx() {
    return owner.issueBurnTx(this.options);
  }
}

module.exports = GrinClient;
