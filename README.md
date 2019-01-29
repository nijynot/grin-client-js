# grin-client-js

> A JavaScript client for Grin's V1 API.

## Install
```
$ npm install grin-client
```

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

## API
**`.blocks(id)`**  
&emsp;&emsp;`id`: `<string>` can be hash, height or commit.  
**`.headers(id)`**  
&emsp;&emsp;`id`: `<string>` can be hash, height or commit.  
**`.chain()`**  
**`.chainCompact()`**  
**`.chainValidate()`**  
**`.chainOutputsByIds(ids)`**  
&emsp;&emsp;`ids`: `<string[]>`  
**`.chainOutputsByHeight(obj)`**  
&emsp;&emsp;`obj`: `<Object>`  
&emsp;&emsp;&emsp;&emsp;`startHeight`: `<integer>`  
&emsp;&emsp;&emsp;&emsp;`endHeight`: `<integer>`  
**`.status()`**  
**`.txhashsetRoots()`**  
**`.txhashsetLastOutputs(n)`**  
&emsp;&emsp;`n`: `<integer>`  
**`.txhashsetLastRangeProofs(n)`**  
&emsp;&emsp;`n`: `<integer>`  
**`.txhashsetLastKernels(n)`**  
&emsp;&emsp;`n`: `<integer>`  
**`.txhashsetOutputs(obj)`**  
&emsp;&emsp;`obj`: `<Object>`  
&emsp;&emsp;&emsp;&emsp;`startIndex`: `<integer>`  
&emsp;&emsp;&emsp;&emsp;`max`: `<integer>`  
**`.txhashsetMerkleProof(id)`**  
&emsp;&emsp;`id`: `<string>`  
**`.pool()`**  
**`.peersBan(addr)`**  
&emsp;&emsp;`addr`: `<string>`  
**`.peersUnban(addr)`**  
&emsp;&emsp;`addr`: `<string>`  
**`.peersAll()`**  
**`.peersConnected()`**  
**`.peers(addr)`**  
&emsp;&emsp;`addr`: `<string>`

## Related
[grin-ql-js](https://github.com/nijynot/grin-ql-js)  
[API documentation in mimblewimble/grin](https://github.com/mimblewimble/grin/blob/master/doc/api/node_api.md)

## License
MIT
