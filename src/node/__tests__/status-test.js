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

describe('Node API: GET Status', () => {
  it('resolve status', async () => {
    const res = {
      "protocol_version": 1,
      "user_agent": "MW/Grin 1.0.0",
      "connections": 16,
      "tip": {
        "height": 14400,
        "last_block_pushed": "000001828d36d3e65b805e50f1e3a0598d5f74a190c5b4fac96321fbffc62172",
        "prev_block_to_last": "00000207602206c47d083081d8627c68d79b2ba5daf8c79dcb7014cdc461ee79",
        "total_difficulty": 7294176550841
      }
    };

    nock('http://127.0.0.1:3413')
      .get('/v1/status')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, res);

    const grin = new GrinClient(options);
    expect(await grin.status()).to.deep.equal(res);
  });

  it('reject if status code 404', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/status')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(404);

    const grin = new GrinClient(options);
    try {
      await grin.status();
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${404}`);
    }
  });
});
