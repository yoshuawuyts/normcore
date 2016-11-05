# normcore [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

No-config distributed streams using [hypercore][hypercore].

## Usage
```js
const normcore = require('normcore')

const feed = normcore()
console.log('key is: ' + feed.key.toString('hex'))

feed.append('hello')
feed.append('hello')
```

## API
### feed = normcore(key?)
Create a new `normcore` instance. Optionally takes a key to replicate from
another feed

### key = feed.key
Get the hypercore key. You probably usually want to turn it into a hex value:
```js
const hypercore = require('hypercore')
const feed = normcore('omnormnormnormnorm')
console.log(feed.key.toString('hex'))
```

### feed.append(data)
Write data into the feed

### writeableStream = feed.createWriteableStream()
Create a new `writeableStream` you can write data to

### readableStream = feed.createReadableStream()
Create a new `readableStream` you can read data from

## Installation
```sh
$ npm install normcore
```

## See Also
- [hypercore][hypercore]
- [hyperdrive-archive-swarm][swarm]

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/normcore.svg?style=flat-square
[3]: https://npmjs.org/package/normcore
[4]: https://img.shields.io/travis/yoshuawuyts/normcore/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/normcore
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/normcore/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/normcore
[8]: http://img.shields.io/npm/dm/normcore.svg?style=flat-square
[9]: https://npmjs.org/package/normcore
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard

[hypercore]: https://github.com/mafintosh/hypercore
[swarm]: https://github.com/karissa/hyperdrive-archive-swarm
