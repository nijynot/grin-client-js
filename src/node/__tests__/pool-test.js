const { describe, it } = require('mocha');
const { expect } = require('chai');
const nock = require('nock');

const GrinClient = require('../../client');
const { base64 } = require('../../utils/common');

const options = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: 3413,
  username: 'grin',
  password: 'API_SECRET',
  auth: 'grin:API_SECRET',
};

describe('Node API: GET Pool', () => {
  it('resolve pool', async () => {
    const res = { pool_size: 4 };

    nock('http://127.0.0.1:3413')
      .get('/v1/pool')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, res);

    const grin = new GrinClient(options);
    expect(await grin.pool()).to.deep.equal(res);
  });

  it('reject if status code 500', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/pool')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(500);

    const grin = new GrinClient(options);
    try {
      await grin.pool();
    } catch (e) {
      expect(e.status).to.equal(500);
    }
  });
});
