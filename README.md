# grin-client-js

> A JavaScript client for Grin's V1 API.

## Installation
`npm install grin-client` or `yarn add grin-client`

## Usage
### Example
```js
const GrinClient = require('./src/index');

(async function () {
  const grin = new GrinClient({
    protocol: 'http',
    hostname: '127.0.0.1',
    port: 3413,
    username: 'grin',
    password: 'api_secret',
  });

  try {
    const status = await grin.status();
    const block = await grin.block(13474);
    ...
  } catch(err) {
    console.log(err);
  }
})();
```
