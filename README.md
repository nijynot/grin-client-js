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

### `new GrinClient(options)`
Creates a new instance of a `GrinClient`.

#### `options`
##### `options.protocol`
Either `http` or `https`  
Type: `string`

##### `options.hostname`
Type: `string`

##### `options.host`
Type: `string`

##### `options.port`
Type: `number`

##### `options.username`
Type: `string`

##### `options.password`
The Grin node's `.api_secret`. Can be found in `~/.grin/main/.api_secret`.  
Type: `string`

### Instance methods

#### `grin.blocks(id)`
`id`: `<string>` can be hash, height or commit.  

#### `grin.headers(id)`
`id`: `<string>` can be hash, height or commit.  

#### `grin.chain()`

#### `grin.chainValidate()`

#### `grin.chainOutputsByIds(ids)`
`ids`: `<string[]>`  

#### `grin.chainOutputsByHeight(obj)`
`obj`: `<Object>`  
`obj.startHeight`: `<integer>`  
`obj.endHeight`: `<integer>`  

#### `grin.status()`

#### `grin.txhashsetRoots()`

#### `grin.txhashsetLastOutputs(n)`
`n`: `<integer>`  

#### `grin.txhashsetLastRangeProofs(n)`
`n`: `<integer>`  

#### `grin.txhashsetLastKernels(n)`
`n`: `<integer>`  

#### `grin.txhashsetOutputs(n)`
`obj`: `<Object>`  
`obj.startIndex`: `<integer>`  
`obj.max`: `<integer>`  

#### `grin.txhashsetMerkleProof(n)`
`id`: `<string>`  
#### `grin.pool(n)`
`id`: `<string>`  

#### `grin.peersBan(addr)`
`addr`: `<string>`  

#### `grin.peersUnban(addr)`
`addr`: `<string>`  

#### `grin.peersAll()`

#### `grin.peersConnected()`

#### `grin.peers(addr)`
`addr`: `<string>`

## Related
[grin-ql-js](https://github.com/nijynot/grin-ql-js)  
[mimblewimble/grin REST API](https://github.com/mimblewimble/grin/blob/master/doc/api/node_api.md)

## License
MIT
