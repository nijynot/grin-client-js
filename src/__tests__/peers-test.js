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

describe('Node API: POST Peers Ban', () => {
  it('resolve peers ban', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .post('/v1/peers/192.168.1.1:13414/ban')
      .reply(200);

    const grin = new GrinClient(testOptions);
    expect(await grin.peersBan('192.168.1.1:13414')).to.equal(200);
  });

  it('reject if status code 500', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .post('/v1/peers/192.168.1.1:13414/ban')
      .reply(400);

    const grin = new GrinClient(testOptions);
    try {
      await grin.peersBan('192.168.1.1:13414');
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${400}`);
    }
  });
});

describe('Node API: POST Peers Unban', () => {
  it('resolve peers ban', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .post('/v1/peers/192.168.1.1:13414/unban')
      .reply(200);

    const grin = new GrinClient(testOptions);
    expect(await grin.peersUnban('192.168.1.1:13414')).to.equal(200);
  });

  it('reject if status code 500', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .post('/v1/peers/192.168.1.1:13414/unban')
      .reply(400);

    const grin = new GrinClient(testOptions);
    try {
      await grin.peersUnban('192.168.1.1:13414');
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${400}`);
    }
  });
});

describe('Node API: GET Peers All', () => {
  it('resolve peers all', async () => {
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

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/peers/all')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.peersAll()).to.deep.equal(res);
  });

  it('reject if status code 400', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/peers/all')
      .reply(400);

    const grin = new GrinClient(testOptions);
    try {
      await grin.peersAll();
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${400}`);
    }
  });
});

describe('Node API: GET Peers Connected', () => {
  it('resolve peers connected', async () => {
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

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/peers/connected')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.peersConnected()).to.deep.equal(res);
  });

  it('reject if status code 500', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/peers/connected')
      .reply(500);

    const grin = new GrinClient(testOptions);
    try {
      await grin.peersConnected();
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${500}`);
    }
  });
});

describe('Node API: GET Peers', () => {
  it('resolve peers', async () => {
    const res = {
      "addr": "192.168.1.2:3414",
      "capabilities": { "bits": 15 },
      "user_agent": "MW/Grin 1.0.0",
      "flags": "Healthy",
      "last_banned": 0,
      "ban_reason": "None",
      "last_connected": 1548447743
    };

    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/peers/192.168.1.2:3414')
      .reply(200, res);

    const grin = new GrinClient(testOptions);
    expect(await grin.peers('192.168.1.2:3414')).to.deep.equal(res);
  });

  it('reject if status code 404', async () => {
    nock('http://grin:API_SECRET@127.0.0.1:3413')
      .get('/v1/peers/192.168.1.2:3414')
      .reply(404);

    const grin = new GrinClient(testOptions);
    try {
      await grin.peers('192.168.1.2:3414');
    } catch (e) {
      expect(e.message).to.equal(`Request Failed. Status Code: ${404}`);
    }
  });
});
