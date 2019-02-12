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

describe('Node API: GET Chain', () => {
  it('resolve .chain', async () => {
    const chain = {
      "height": 14336,
      "last_block_pushed": "000000e5426ef5f541a2abad523f1418375cb2661a14108e26a4a355597aad48",
      "prev_block_to_last": "000000eecadc9c6f2a711bcb06f94e16a76dcc534116bbd45fe6560167ef967f",
      "total_difficulty": 7237340681596
    };

    nock('http://127.0.0.1:3413')
      .get('/v1/chain')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, chain);

    const grin = new GrinClient(options);
    expect(await grin.chain()).to.deep.equal(chain);
  });

  it('resolve .chain if status code 500', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/chain')
      .reply(500);

    const grin = new GrinClient(options);
    try {
      await grin.chain();
    } catch (e) {
      expect(e.status).to.equal(500);
    }
  });
});

describe('Node API: POST Chain Compact', () => {
  it('resolve .chainCompact', async () => {
    nock('http://127.0.0.1:3413')
      .post('/v1/chain/compact')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200);

    const grin = new GrinClient(options);
    const { status } = await grin.chainCompact()
    expect(status).to.equal(200);
  });

  it('reject .chainCompact if status code is 500', async () => {
    nock('http://127.0.0.1:3413')
      .post('/v1/chain/compact')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(500);

    const grin = new GrinClient(options);
    try {
      await grin.chainCompact();
    } catch (e) {
      expect(e.status).to.equal(500);
    }
  });
});

describe('Node API: POST Chain Validate', () => {
  it('resolve .chainValidate', async () => {
    nock('http://127.0.0.1:3413')
      .post('/v1/chain/validate')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200);

    const grin = new GrinClient(options);
    const { status } = await grin.chainValidate()
    expect(status).to.equal(200);
  });

  it('reject .chainValidate if status code is 500', async () => {
    nock('http://127.0.0.1:3413')
      .post('/v1/chain/validate')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(500);

    const grin = new GrinClient(options);
    try {
      await grin.chainValidate();
    } catch (e) {
      expect(e.status).to.equal(500);
    }
  });
});

describe('Node API: GET Chain Outputs By IDs', () => {
  it('resolve .chainOutputsByIds', async () => {
    const res = [
      {
        "commit": "0955adbb59ffbf467ed720a0cc5c13ed466d9bf242a9b6946d3a9c0c517aaabfff",
        "height": 1571,
        "mmr_index": 3424
      }
    ];

    nock('http://127.0.0.1:3413')
      .get('/v1/chain/outputs/byids?id=0955adbb59ffbf467ed720a0cc5c13ed466d9bf242a9b6946d3a9c0c517aaabfff')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, res);

    const grin = new GrinClient(options);
    expect(await grin.chainOutputsByIds('0955adbb59ffbf467ed720a0cc5c13ed466d9bf242a9b6946d3a9c0c517aaabfff')).to.deep.equal(res);
  });

  it('resolve .chainOutputsByIds if status code is 404', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/chain/outputs/byids?id=0955adbb59ffbf467ed720a0cc5c13ed466d9bf242a9b6946d3a9c0c517aaabfff')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(404, '[]');

    const grin = new GrinClient(options);
    expect(await grin.chainOutputsByIds('0955adbb59ffbf467ed720a0cc5c13ed466d9bf242a9b6946d3a9c0c517aaabfff')).to.deep.equal([]);
  });

  // TODO: write test for array of ids
});

describe('Node API: GET Chain Outputs By Height', () => {
  it('resolve .chainOutputsByHeight', async () => {
    const res = [
      {
        "header": {
          "hash": "000004f5b09af74749adf4b380029dbf76c19f7dadc0a5613d6884f27d40b2c8",
          "height": 14001,
          "previous": "0000017835aa0b5012884c0af15e3c8dc52d466f3e7dc2ddc76a551ca49aacce"
        },
        "outputs": [
          {
            "output_type": "Transaction",
            "commit": "09a0aab6174b9e5d1f1291c776e154e3f2ef55e6b432873929ef05bdb3f701e2f8",
            "spent": false,
            "proof": null,
            "proof_hash": "5a79d59596f53a829074c4afd993300a882ba1bfb777ab535102956397d94612",
            "block_height": 14001,
            "merkle_proof": null,
            "mmr_index": 136480
          },
          {
            "output_type": "Transaction",
            "commit": "08e637fee768af01673f5b6a4a30f33ebca101722a8e202d7653a88d34d83ef325",
            "spent": true,
            "proof": null,
            "proof_hash": "e094feae3e4435b5931f4692ca3932634268a40fc37cc1e515f374ad7f6b5ec5",
            "block_height": null,
            "merkle_proof": null,
            "mmr_index": 136483
          },
          {
            "output_type": "Coinbase",
            "commit": "08325de911f1dc4d6e6c09ab6f61de89905a9f1cb77f216d821b0bcd55ec3ec71a",
            "spent": false,
            "proof": null,
            "proof_hash": "35b556e5833d131ad4d839679b795525db3305d566b3283cea9cae8ad3a06dee",
            "block_height": 14001,
            "merkle_proof": "000000000002152b0000000000000009d12364953be71eda761f679c4245051726c3e8dd4bf30bf3b49f8a208b458f41d50b624daa013bfd83d1e4846f40e81e9772483f12bf0c3fb0ec8ca32019b033a1d3226930fe5b5a3103fcf05a31da91cb244b68fcb9687e26dd193c91cf752d15ec8bb723a255f4a78b02cf9deac18fdee2f9bd74319311dcc18486eaf579a5d0858fc93d5e89e02d67e4f0cd39b5bda8fc0c45abca41b5537e6757431125a1b4a7135252bb37e76df12c1fbfd918066d00873dd52ec20ed8cc2058b70219b656524a279431a11236ab537d7d98f7d15d7e2106654bab18f2fa0432aad1882b3cd748b750a0c4b6758ad7bd76e950ab803189e377304fdf97c421ebf45039d866bf6f5cf8cfe40bf1423d8e8fe49a62c70af320689a764939a86bf6f421eab8",
            "mmr_index": 136484
          },
          {
            "output_type": "Transaction",
            "commit": "0822166144992d77cfabda2a5901270deb93ab30a29aa18f01da6b78c5f8036b34",
            "spent": true,
            "proof": null,
            "proof_hash": "ca259fb22cb87d5a4b44a30c9c8d1a0d90f4c9dcddd8817d2978d54f8027c356",
            "block_height": null,
            "merkle_proof": null,
            "mmr_index": 136486
          },
          {
            "output_type": "Transaction",
            "commit": "09a36739d61c1f1dc3eb30331b382cc3b1d61c80e58785338e04f6b9ab2de2c3fb",
            "spent": true,
            "proof": null,
            "proof_hash": "6f224a03e07d23a0fe9c8205c5aa3db50c3784b52136d092a118f1463cf78a77",
            "block_height": null,
            "merkle_proof": null,
            "mmr_index": 136487
          },
          {
            "output_type": "Transaction",
            "commit": "08083f26159e7802b2b292584f087a32f4640ebf93b85c36ffbdb56e16ae87de30",
            "spent": false,
            "proof": null,
            "proof_hash": "a9122485ca32d76099107473afb9f0665de76b2c474e3655e6b47554363837d9",
            "block_height": 14001,
            "merkle_proof": null,
            "mmr_index": 136491
          }
        ]
      },
      {
        "header": {
          "hash": "0000017835aa0b5012884c0af15e3c8dc52d466f3e7dc2ddc76a551ca49aacce",
          "height": 14000,
          "previous": "00000471cb44bc223321e0682471e8b37f07bd495a3471c69e09c1bc0164bd31"
        },
        "outputs": [
          {
            "output_type": "Coinbase",
            "commit": "096ee00539de2f17c45f58008bb859a52c6adf7cbd681c3e44f898b024b23f7130",
            "spent": false,
            "proof": null,
            "proof_hash": "5a843c87275d45243fb85591cbe58bef77285c13ca4f68e66e9610295a544a01",
            "block_height": 14000,
            "merkle_proof": "000000000002151f0000000000000006c242911142ce2d3d4de7a37988d87740e53e3819690079f02cea6ec951ba8672d0858fc93d5e89e02d67e4f0cd39b5bda8fc0c45abca41b5537e6757431125a1b4a7135252bb37e76df12c1fbfd918066d00873dd52ec20ed8cc2058b70219b656524a279431a11236ab537d7d98f7d15d7e2106654bab18f2fa0432aad1882b3cd748b750a0c4b6758ad7bd76e950ab803189e377304fdf97c421ebf45039d866bf6f5cf8cfe40bf1423d8e8fe49a62c70af320689a764939a86bf6f421eab8",
            "mmr_index": 136479
          }
        ]
      }
    ];

    nock('http://127.0.0.1:3413')
      .get('/v1/chain/outputs/byheight?start_height=14000&end_height=14001')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, res);

    const grin = new GrinClient(options);
    expect(await grin.chainOutputsByHeight({ startHeight: 14000, endHeight: 14001 })).to.deep.equal(res);
  });

  it('resolve .chainOutputsByHeight if status code 404 and out of range', async () => {
    const res = [];

    nock('http://127.0.0.1:3413')
      .get('/v1/chain/outputs/byheight?start_height=1&end_height=1')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(404, '[]');

    const grin = new GrinClient(options);
    expect(await grin.chainOutputsByHeight({ startHeight: 1, endHeight: 1 })).to.deep.equal(res);
  });
});
