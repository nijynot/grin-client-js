const { format, response } = require('../utils/request');
const url = require('url');

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

function headers(options, param) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/headers/${param}` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

function chain(options) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/chain` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

function status(options) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/status` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

function txhashsetRoots(options, param) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/txhashset/roots` }),
      { auth: `${options.user}:${options.password}` },
      response(resolve, reject)
    );
  });
}

function txhashsetLastOutputs(options, param) {
  return new Promise((resolve, reject) => {
    options.agent.get(
      format({ ...options, pathname: `/v1/txhashset/lastoutputs`, search: { n: param } }),
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
};
