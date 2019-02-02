const { describe, it } = require('mocha');
const { expect } = require('chai');
const nock = require('nock');

const GrinClient = require('../../client');

const testOptions = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: 3413,
  username: 'grin',
  password: 'API_SECRET',
};

describe('Node API: GET Pool', () => {
  it('resolve pool', async () => {
    const res = { pool_size: 4 };

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/pool')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.pool()).to.deep.equal(res);
  });

  it('reject if status code 500', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/pool')
      .reply(500);

    const grin = new GrinClient(testOptions);
    try {
      await grin.pool();
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${500}`);
    }
  });
});
