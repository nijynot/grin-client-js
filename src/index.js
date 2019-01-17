const Request = require('./request');

const user = 'grin';
const API_SECRET = 'xHGUzK7MxxdjHx7opbdy';

// Command that works
// curl --user grin:xHGUzK7MxxdjHx7opbdy http://127.0.0.1:3413/v1/blocks/1

function grinClient(options) {
  let optionsCopy = {};
  if (typeof options === 'object') {
    optionsCopy = Object.assign({}, options);
  }

  return request(options)
}

(async function () {
  const grin = new Request({
    protocol: 'http',
    host: '127.0.0.1',
    port: 3413,
    user: 'grin',
    password: 'xHGUzK7MxxdjHx7opbdy',
  });

  const block = await grin.block(1);
  console.log(block);
})();
