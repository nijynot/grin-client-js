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

describe('Node API: GET Headers', () => {
  it('resolve .headers', async () => {
    const genesisHeader = {
      "hash": "000000bf7e67a6c9323f26e1eb26fa73f73640349710ea5a9f589c12a812a4b5",
      "version": 1,
      "height": 1,
      "previous": "40adad0aec27797b48840aa9e00472015c21baea118ce7a2ff1a82c0f8f5bf82",
      "prev_root": "5671fb28c1509e422d9b8f60ce90e9ac9041e3b9febd34a79c03048844ed2733",
      "timestamp": "2019-01-15T17:38:05+00:00",
      "output_root": "a53cc645b695596f5437c15af883336f12d72a5adcd9dcbc83a0cca17f7ce820",
      "range_proof_root": "28e593563af806a46f969308c08163018783f3385bd4c89fe39ed8d345a311a0",
      "kernel_root": "b27433269e3e898c281e3673c5c44b47c6f398b396b340a8680f6efe4d7c48e6",
      "nonce": 8433034053148818000,
      "edge_bits": 29,
      "cuckoo_solution": [
        22765804, 23118090, 24420163, 73257942, 76703403, 78035881, 85274692,
        99498099, 141251856, 159129371, 170157046, 176734530, 177149713, 191166564,
        198515649, 216647080, 239322526, 257040135, 263422045, 295815712, 296909516,
        298878895, 308163791, 311486491, 316748546, 334605572, 373599137, 383706702,
        387436578, 407678571, 417364553, 422102743, 435260213, 447162470, 448112469,
        456169071, 460072333, 496033308, 498744412, 513855100, 524023965, 526430265
      ],
      "total_difficulty": 34359738368,
      "secondary_scaling": 1840,
      "total_kernel_offset": "0000000000000000000000000000000000000000000000000000000000000000"
    };

    nock('http://127.0.0.1:3413')
      .get('/v1/headers/1')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, genesisHeader);

    const grin = new GrinClient(options);
    expect(await grin.headers(1)).to.deep.equal(genesisHeader);
  });

  it('resolve .headers with empty object if status code 404', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/headers/1')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(404, '');

    const grin = new GrinClient(options);
    expect(await grin.headers(1)).to.deep.equal({});
  });

  it ('reject .headers with status code 500 if out of bounds', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/headers/10000000000000000')
      .reply(500, 'failed to parse input: Not found.');

    const grin = new GrinClient(options);
    try {
      await grin.headers(10000000000000000);
    } catch (err) {
      expect(err.message).to.equal('failed to parse input: Not found.');
    }
  });
});
