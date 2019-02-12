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

describe('Node API: GET Blocks', () => {
  it('resolve genesis block', async () => {
    const genesisBlock = {
      "header": {
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
      },
      "inputs": [],
      "outputs": [
        {
          "output_type": "Coinbase",
          "commit": "0985145c00fc6b0adef5d703c8028884493d73b3b2285b03c21d70fb0182d939d2",
          "spent": true,
          "proof": null,
          "proof_hash": "fa16aa8e288a71df77c17e35ddea7d43ddb1a0cc36088316df7ef7ae43546f8e",
          "block_height": null,
          "merkle_proof": null,
          "mmr_index": 2
        }
      ],
      "kernels": [
        {
          "features": "Coinbase",
          "fee": 0,
          "lock_height": 0,
          "excess": "088d2fd546465fdd8f24c554d6afe7f95f6640c3ca446e977a21f1a3dc0f1705ea",
          "excess_sig": "98e50bcdab3e3b1ef183d76a46ecec6396dee73f5a7b7a80cac08ef8c874a658e8468bfb03fd7ebd545b3bbce04d3f651edf9f4412af940486d140034e5254be"
        }
      ]
    };

    nock('http://127.0.0.1:3413')
      .get('/v1/blocks/1')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, genesisBlock);

    const grin = new GrinClient(options);
    expect(await grin.blocks(1)).to.deep.equal(genesisBlock);
  });

  it('resolve empty block with status code 404', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/blocks/1')
      .reply(404, '');

    const grin = new GrinClient(options);
    expect(await grin.blocks(1)).to.deep.equal({});
  });

  it ('reject if out of bounds with status code 400', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/blocks/1000000000000')
      .reply(400, 'failed to parse input: Not found.');

    const grin = new GrinClient(options);
    try {
      await grin.blocks(1000000000000);
    } catch (e) {
      expect(e.status).to.equal(400);
      expect(e.message).to.equal('failed to parse input: Not found.');
    }
  });
});
