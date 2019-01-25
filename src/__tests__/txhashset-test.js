const { describe, it } = require('mocha');
const { expect } = require('chai');
const nock = require('nock');

const GrinClient = require('../client');

const testOptions = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: 3413,
  username: 'grin',
  password: 'API_SECRET',
};

describe('Node API: GET TxHashSet Roots', () => {
  it('resolve txhashset roots', async () => {
    const res = {
      "output_root_hash": "cab5bc6fd55bac0362ec926ba3314a5cba396ccdd7c34254eb15b7a43d7c410b",
      "range_proof_root_hash": "58047a56b05f41fdcc0c8bde68a06d051711947c223b89e9e245badae5c6c8ad",
      "kernel_root_hash": "2d5a06ae47dffc000a18d531372002e8918afe034ed9751e5990fd6a0ca55e17"
    };

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/roots')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.txhashsetRoots()).to.deep.equal(res);
  });

  it('reject if status code 404', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/roots')
      .reply(500);

    const grin = new GrinClient(testOptions);
    try {
      await grin.txhashsetRoots();
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${500}`);
    }
  });
});

describe('Node API: GET TxHashSet Last Outputs', () => {
  it('resolve txhashset last outputs', async () => {
    const res = [
      {
        "hash": "7cf78be66ab6bb3a08c060f5d3be480b16852e541bd882f27f9571929de9c4e7"
      },
      {
        "hash": "d464b60cfcf17a196e563eb96e0342ab8f4cb94679a8c995e551dd0288384db1"
      },
      { "hash": "b72ef50f27a1b94637d6c0570f7384fd35272bc55c1a02241cd7e4b26f9e766e" }
    ];

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/lastoutputs?n=3')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.txhashsetLastOutputs(3)).to.deep.equal(res);
  });

  it('reject if status code not 200', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/lastoutputs?n=3')
      .reply(500);

    const grin = new GrinClient(testOptions);
    try {
      await grin.txhashsetLastOutputs(3);
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${500}`);
    }
  });
});

describe('Node API: GET TxHashSet Last Range Proofs', () => {
  it('resolve txhashset last range proofs', async () => {
    const res = [
      {
        "hash": "d31b194b9632af320b6db207c05d8a6f8af5528e67ce892418cea0e8d5a2bcde"
      },
      {
        "hash": "b07b46254b08424ca0c7d6e93a7242175839d82b983852dbdf28bcf87c2c7eb1"
      },
      { "hash": "09e5764a6a7112599ce1abac93614a473907ec012e6dab26c1e376e9368a1090" }
    ];

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/lastrangeproofs?n=3')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.txhashsetLastRangeProofs(3)).to.deep.equal(res);
  });

  it('reject if status code not 200', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/lastrangeproofs?n=3')
      .reply(500);

    const grin = new GrinClient(testOptions);
    try {
      await grin.txhashsetLastRangeProofs(3);
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${500}`);
    }
  });
});

describe('Node API: GET TxHashSet Last Kernels', () => {
  it('resolve txhashset last kernels', async () => {
    const res = [
      {
        "hash": "8f05868fec2fbca85547b8de943787c66672d33506d1ac8efb1d8c080ebb17f7"
      },
      {
        "hash": "4c36caec265038c0813f1ddef4155f8eb2a214117679078c3767449c692f33db"
      },
      { "hash": "9939a693e4eb345539202d50322377b6a208dd9766f402aa8dd5cc5012bd9736" }
    ];

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/lastkernels?n=3')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.txhashsetLastKernels(3)).to.deep.equal(res);
  });

  it('reject if status code not 200', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/lastkernels?n=3')
      .reply(500);

    const grin = new GrinClient(testOptions);
    try {
      await grin.txhashsetLastKernels(3);
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${500}`);
    }
  });
});

describe('Node API: GET TxHashSet Outputs', () => {
  it('resolve txhashset outputs', async () => {
    const res = {
      "highest_index": 71150,
      "last_retrieved_index": 30,
      "outputs": [
        {
          "output_type": "Coinbase",
          "commit": "08b7e57c448db5ef25aa119dde2312c64d7ff1b890c416c6dda5ec73cbfed2edea",
          "spent": false,
          "proof": "9330ad8cde205f317c6537eca96b866293a0489615a9a277b4d3a597c873544c82474932b641e06ac8719604ee52e895e8cd4621b6bfb85780cd9becce14d0700b83a664db2f52a26c425fd777ad88944cdfff38043a2793ed4d9aa67e36cbfd5585579fc69dda930418af5eaf603654f6f751258d2dfc8c2113c171e130f31ec1e6cce2a718e435298fce5d64ffe1bd3464fd7c87cfa92093855be034bfe4439e928bd92ad77fd0a0e00355ee1d1a9ceb1ed0c408dcfdba8c583e7598dc700aaa9f91432097259a405f5b7315a2f7658861e3349bb0dc8bf883726a215f0149ded6613e5ac0670c0c5202247d7c27c8a7d03bdb03c9cf5455463f9b42cf87403e31f8383cc4f49a34c62ae459f5801a9eed4f0ee3dfd5f55b7011c0cae393c474abd6f8c7965b9b5fff3104dd4e39542077c0c8dd2f8ffceb6bb598512d90506d0a7184f20f1498cf458787f23284b54888c9be416d103f760406357a16b6d841a303d5c95b6b474d2d7f0fea0a2a76c897dd2110e9303f54684169421147684c6f1819c33cef3f38ec995a508450c02cd1872f8065fdee723109c18b1dd2ddde75825546ecf0df0793c353b20c946cd64122cea8c116f432336899a16ad24a2aafcb8f900e09a1147135fcf2a54cbf81db308a47a08a49c77c130e5dc5e661cd55a5cc69e607055a5b08111bf61a62ea5778f85119043633f1cab8c756d756c5a34851024ac311a596b1cd919bbca43226f0ba057f6b57de2f6955b0823c3826de7f6096c1c1b6b9b8e4063e1645c0bff32f80561aaa959d97120fbc2ecd9d2be28bd0c17811dc59a88049f6d8952ee9a0a0207693c89ca3ad1197e9bfdfc03be9d845aea8d663969217e3b494cee9e652bc9f8713e2fd5cb1843848f46c3a6ab024d0e3d57ca45454cdbda414adaa835fa147deb4ffb7129cf3a8d86726a0144794",
          "proof_hash": "6c301688d9186c3a99444f827bdfe3b858fe87fc314737a4dc1155d9884491d2",
          "block_height": 0,
          "merkle_proof": null,
          "mmr_index": 1
        },
        {
          "output_type": "Coinbase",
          "commit": "08db95aa4a805542fc98d1d544841118dfde97d41c64fc2ca7494c7c417a76843b",
          "spent": false,
          "proof": "8e2a7e2727cb2a4238f02d0b9baa650f666eb60dcc10f34be54fe662fca6846d7aa0acb55f66fa1d78ce5036816ba9a3c753f26d1b84847900a27f95c82003d804f4b4746c702fa1fb18e1ff40502559b5377eba571932ab1964c1a6f70673b25f6c9daddc83aec03c966f05f30e2a9857674af833177647861af13da4a885208ad565281be134ca9c63386e01540cec9ee53cd14f4cdd90c2536c6dbe71d598c9c751b18a19384f20a40cb365f00579f991eccfd44c157ffc70478ee501233488702324efc4677fae3b5445adefb7bec09bd6362195835704b31812c509ba539033af6956333d86171c3d5756d79b9a4fdd15e9da68d458552f7194529ee4cd853c0e39d8896ce02ebe6146d22c9fef137c73bc828c57b10a9cfe91349fa9494a343c01fecc75a55411232c4499852ce76da3656aad39f9991ba440401c46e20a243972269c93a417e9a1267bb661e2dc3a8323cfc2d4caa0d4c0e3e7fae57c9e0600e377fadda5010559eb1e3aaeab3bee8b6885858835819a655e304cd39682597f21046134142939f9d1954f27fc12ac3592d680ad0d9f27ba98651029789b95605a9c1621c09161983db612fd6bd1aedb170c1c188f9878c868a0f88adb6639c87a18dc6df70f2e4cff9401a930e7f5643b9bb4b82affce13618414fd1de37955b22b79a4e1bb24bdae01b6b310ca1e78dd9cf07f97e83c41639f27c98d8d6d4c6ace00730d36fed8d9ecae7645eb35b1278d0662b5210eff1c44b52c251752d7f9546ce48bcf5757ee5c3e1e0ace56454a0d8ad88187d89adedb416a78068ab8c6443f6923efcffbff39a29da3a6bb8e3fa56b940a31dab23de0456ff787de52f41c29b37fb5ee2d34270a232a9bea2bdb2c6347c902c42eb653af7ec99523242efa02c43906a0fb7a9dcca79e531bc6adf84760e0c45a31034e610153bab292",
          "proof_hash": "d1b0e4dabac8277fe12cceecbbc6e97e8e4e53184d24dd5e26672fd4fdf27a1b",
          "block_height": 10,
          "merkle_proof": null,
          "mmr_index": 19
        },
        {
          "output_type": "Coinbase",
          "commit": "09bab1ddad0f6fec1aedcd3830c5c647515ad543929e722344e4a8d390b6fdd51b",
          "spent": false,
          "proof": "4a5f858d4311bdd902f4446682f27f64be376283b1171060fd2ad33d85350fee13c25a030874d6308d2b325995a3fe545eb1d85ba66e2ba002b794edfdeacb3f0fd2a690b9a78137771b3633aaef2a77f62fbe4d6b4b373c4bdb7e5f58cfae361a3b4c2e4420cc0d38465b2444e01b50e57c6ebfc2afd6dda9017e54585638bddef17d181d1fd7064d975d8bb1dcfd96c89486aed4680b4d39294a141581d1f51c1acfbb80e2ffc40f8499cdc43be04cacda1e34dd6592edfc500229aa70db1c2869f974cfe9aee0cab696c198624de8ecdaf5ae481a1e46fe79fe983209459b89492f2b24416c368394c43c60c33d0fdd1792f0a58d11763e7c8b89d27da25109db346e4d7b62935d182b45dfb659829c55922350e6f7e3452d9311e527ec5b561f4d043cef865f683fce1ce2d410d414f5bcee63c4bbc00964b0fa757bdfd68158e22c1068d871a45759fbd527883c0451db6f36b15139864b6177a78ad64d326e0152914e5313a97ed7b685e5089f2758bf072c804560306bd944831f067c3413ded09330fd788f353e4ee875d3c9303dd4ec0dda9d55b4a27d7748b3247fe85cf3d26b7004e6e3379041fad136fccdacd02b06456a50ad40a3259842c0794f2d59dbd8fa6b4af065b38c388d76b82136b633b06779e4eb05b5b62ec37cdc2986327639bafa8651318f4c00c066e6f45504ec9a96874d5510b519f434a1a88175d51f86e8ee36ae18d107cfaf83e60b2e62fff032c7539be66d776e3a52c5f9b0ee6fe08820d65cd75d35c793e5ab3914adf5a97b7dba75e90d4a4c9aa844e2f1e9464cd5fc4923b475defca4e3b03e1b33353ff91ac1084712cf4445e329ffdbe1e2da16ae71dee0e914b546fdc0db9b0fcde80822ee716e9f2eec90db7aa4417d53a1266e1e8383e20c9a9548bae35c2a8e1293a49e7afbd8011a9e66e79ed6be",
          "proof_hash": "a64ed774d824dc55123c6c5ba46d84bac15b6ead8cb60200836c2a0e74506ab0",
          "block_height": 29,
          "merkle_proof": null,
          "mmr_index": 55
        }
      ]
    };

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/outputs?start_index=1&max=3')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.txhashsetOutputs({ startIndex: 1, max: 3 })).to.deep.equal(res);
  });

  it('reject if status code not 200', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/outputs?start_index=1&max=3')
      .reply(500);

    const grin = new GrinClient(testOptions);
    try {
      await grin.txhashsetOutputs({ startIndex: 1, max: 3 });
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${500}`);
    }
  });
});

describe('Node API: GET TxHashSet Merkle Proof', () => {
  it('resolve txhashset merkle proof', async () => {
    const res = {
      "output_type": "Coinbase",
      "commit": "000000000000000000000000000000000000000000000000000000000000000000",
      "spent": false,
      "proof": null,
      "proof_hash": "",
      "block_height": null,
      "merkle_proof": "0000000000022c65000000000000000eba13674c2f6c06b9777e7f07e1ebbac0ebc8f042e2ae58aecc1f0977df09fcecc242911142ce2d3d4de7a37988d87740e53e3819690079f02cea6ec951ba86729c7fac6896c2577daefa1449786d489cfd0860b45e74382f5812a4642d290b0120867895a86846d7c62184919c029d7f25b74026e2bbffbcec2b9db96bc82ef2d0858fc93d5e89e02d67e4f0cd39b5bda8fc0c45abca41b5537e6757431125a15163ae0f464ce5c9e87bccde3fc237c13eb409e6bef8e2a90023fc3bb7c5e053ec515997b0289eab5b2fc0090cc083de2712ee1a89ef3997dc4ebf0b5f35aad5b4a7135252bb37e76df12c1fbfd918066d00873dd52ec20ed8cc2058b70219b6a5b1cfd631f8bb9c0f4173f5bf6b69e00021da156488946d8101838083d4a8ad56524a279431a11236ab537d7d98f7d15d7e2106654bab18f2fa0432aad1882b89f593faecc28d2ba717e14edc888571494c7e672e5a4ecb5aa52990ae840cc13cd748b750a0c4b6758ad7bd76e950ab803189e377304fdf97c421ebf45039d8eba5574106725c1079f6c5d4f27ec6770dfbafe4d21f4862022e677aac6d03bd66bf6f5cf8cfe40bf1423d8e8fe49a62c70af320689a764939a86bf6f421eab8",
      "mmr_index": 136479
    };

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/merkleproof?id=096ee00539de2f17c45f58008bb859a52c6adf7cbd681c3e44f898b024b23f7130')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.txhashsetMerkleProof('096ee00539de2f17c45f58008bb859a52c6adf7cbd681c3e44f898b024b23f7130')).to.deep.equal(res);
  });

  it('reject if status code not 200', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/txhashset/merkleproof?id=096ee00539de2f17c45f58008bb859a52c6adf7cbd681c3e44f898b024b23f7130')
      .reply(400);

    const grin = new GrinClient(testOptions);
    try {
      await grin.txhashsetMerkleProof('096ee00539de2f17c45f58008bb859a52c6adf7cbd681c3e44f898b024b23f7130');
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${400}`);
    }
  });
});
