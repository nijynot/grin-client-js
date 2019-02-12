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

describe('Node API: POST Peers Ban', () => {
  it('resolve .peersBan', async () => {
    nock('http://127.0.0.1:3413')
      .post('/v1/peers/192.168.1.1:13414/ban')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200);

    const grin = new GrinClient(options);
    const { status } = await grin.peersBan('192.168.1.1:13414');
    expect(status).to.equal(200);
  });

  it('reject .peersBan if status code 400', async () => {
    nock('http://127.0.0.1:3413')
      .post('/v1/peers/192.168.1.1:13414/ban')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(400);

    const grin = new GrinClient(options);
    try {
      const { status } = await grin.peersBan('192.168.1.1:13414');
    } catch (e) {
      expect(e.status).to.equal(400);
    }
  });
});

describe('Node API: POST Peers Unban', () => {
  it('resolve .peersUnban', async () => {
    nock('http://127.0.0.1:3413')
      .post('/v1/peers/192.168.1.1:13414/unban')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200);

    const grin = new GrinClient(options);
    const { status } = await grin.peersUnban('192.168.1.1:13414');
    expect(status).to.equal(200);
  });

  it('reject .peersUnban if status code 400', async () => {
    nock('http://127.0.0.1:3413')
      .post('/v1/peers/192.168.1.1:13414/unban')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(400);

    const grin = new GrinClient(options);
    try {
      await grin.peersUnban('192.168.1.1:13414');
    } catch (e) {
      expect(e.status).to.equal(400);
    }
  });
});

describe('Node API: GET Peers All', () => {
  it('resolve .peersAll', async () => {
    const res = [
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1547810562
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1548108043
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1548415392
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1547914189
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1548106632
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1548106632
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1547809152
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1547678599
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1547683561
      },
      {
        "addr": ":3414",
        "capabilities": { "bits": 0 },
        "user_agent": "",
        "flags": "Defunct",
        "last_banned": 0,
        "ban_reason": "None",
        "last_connected": 1547734277
      }
    ];

    nock('http://127.0.0.1:3413')
      .get('/v1/peers/all')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, res);

    const grin = new GrinClient(options);
    expect(await grin.peersAll()).to.deep.equal(res);
  });

  it('reject .peersAll if status code 400', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/peers/all')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(400);

    const grin = new GrinClient(options);
    try {
      await grin.peersAll();
    } catch (e) {
      expect(e.status).to.equal(400);
    }
  });
});

describe('Node API: GET Peers Connected', () => {
  it('resolve .peersConnected', async () => {
    const res = [
      {
        "capabilities": { "bits": 15 },
        "user_agent": "MW/Grin 1.0.0",
        "version": 1,
        "addr": ":3414",
        "direction": "Outbound",
        "total_difficulty": 7310678767377,
        "height": 14418
      },
      {
        "capabilities": { "bits": 15 },
        "user_agent": "MW/Grin 1.0.0",
        "version": 1,
        "addr": ":33414",
        "direction": "Outbound",
        "total_difficulty": 7310678767377,
        "height": 14418
      },
      {
        "capabilities": { "bits": 15 },
        "user_agent": "MW/Grin 1.0.0",
        "version": 1,
        "addr": ":3414",
        "direction": "Outbound",
        "total_difficulty": 7310678767377,
        "height": 14418
      },
      {
        "capabilities": { "bits": 15 },
        "user_agent": "MW/Grin 1.0.0",
        "version": 1,
        "addr": ":3414",
        "direction": "Outbound",
        "total_difficulty": 7310678767377,
        "height": 14418
      },
      {
        "capabilities": { "bits": 15 },
        "user_agent": "MW/Grin 1.0.0",
        "version": 1,
        "addr": ":3414",
        "direction": "Outbound",
        "total_difficulty": 7310678767377,
        "height": 14418
      },
      {
        "capabilities": { "bits": 15 },
        "user_agent": "MW/Grin 1.0.0",
        "version": 1,
        "addr": ":3414",
        "direction": "Outbound",
        "total_difficulty": 7310678767377,
        "height": 14418
      },
      {
        "capabilities": { "bits": 15 },
        "user_agent": "MW/Grin 1.0.0",
        "version": 1,
        "addr": ":3414",
        "direction": "Outbound",
        "total_difficulty": 7310678767377,
        "height": 14418
      },
      {
        "capabilities": { "bits": 15 },
        "user_agent": "MW/Grin 1.0.0",
        "version": 1,
        "addr": ":13414",
        "direction": "Outbound",
        "total_difficulty": 7310678767377,
        "height": 14418
      }
    ];

    nock('http://127.0.0.1:3413')
      .get('/v1/peers/connected')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, res);

    const grin = new GrinClient(options);
    expect(await grin.peersConnected()).to.deep.equal(res);
  });

  it('reject .peersConnected if status code 500', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/peers/connected')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(500);

    const grin = new GrinClient(options);
    try {
      await grin.peersConnected();
    } catch (e) {
      expect(e.status).to.equal(500);
    }
  });
});

describe('Node API: GET Peers', () => {
  it('resolve .peers', async () => {
    const res = {
      "addr": "192.168.1.2:3414",
      "capabilities": { "bits": 15 },
      "user_agent": "MW/Grin 1.0.0",
      "flags": "Healthy",
      "last_banned": 0,
      "ban_reason": "None",
      "last_connected": 1548447743
    };

    nock('http://127.0.0.1:3413')
      .get('/v1/peers/192.168.1.2:3414')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(200, res);

    const grin = new GrinClient(options);
    expect(await grin.peers('192.168.1.2:3414')).to.deep.equal(res);
  });

  it('reject .peers if status code 400', async () => {
    nock('http://127.0.0.1:3413')
      .get('/v1/peers/192.168.1.2:3414')
      .matchHeader('authorization', `Basic ${base64(options.auth)}`)
      .reply(400, 'peer address unrecognized: /v1/peers/192.168.1.2:3414');

    const grin = new GrinClient(options);
    try {
      await grin.peers('192.168.1.2:3414');
    } catch (e) {
      expect(e.status).to.equal(400);
      expect(e.message).to.equal('peer address unrecognized: /v1/peers/192.168.1.2:3414');
    }
  });
});
