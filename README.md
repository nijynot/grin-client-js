# grin-client-js

> A JavaScript client for Grin's V1 API.

## Installation
`npm install grin-client` or `yarn add grin-client`

## Usage
### Example
```js
const GrinClient = require('grin-client');

(async function () {
  const API_SECRET = '...';
  const grin = new GrinClient({
    protocol: 'http',
    hostname: '127.0.0.1',
    port: 3413,
    username: 'grin',
    password: API_SECRET,
  });

  try {
    const status = await grin.status();
    const block = await grin.blocks(13474);
    // ...
  } catch(e) {
    console.log(e);
  }
})();
```
