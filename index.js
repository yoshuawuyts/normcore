const swarm = require('hyperdrive-archive-swarm')
const hypercore = require('hypercore')
const assert = require('assert')
const mkdirp = require('mkdirp')
const level = require('level')
const path = require('path')
const fs = require('fs')

module.exports = Normcore

// No-config hypercore
// str? -> obj
function Normcore (name) {
  assert.equal(typeof name, 'string', 'normcore: name must be a string')

  const isHex = /^[0-9a-f]{64}$/.test(name)
  name = (isHex)
    ? name
    : new Buffer(name).toString('hex')

  const location = path.join(process.env.HOME, '.normcore', name)
  mkdirp.sync(location)

  const secretKeyPath = path.join(location, 'SECRET_KEY')
  const keyPath = path.join(location, 'KEY')
  var defaultSecretKey = null
  var defaultKey = null

  if (fs.existsSync(keyPath)) {
    defaultKey = fs.readFileSync(keyPath)
    defaultSecretKey = fs.readFileSync(secretKeyPath)
  }

  const feedKey = isHex ? name : defaultKey
  const feed = hypercore(level(location)).createFeed(feedKey, {
    secretKey: defaultSecretKey
  })

  if (!isHex) {
    fs.writeFileSync(secretKeyPath, feed.secretKey)
    fs.writeFileSync(keyPath, feed.key)
  }

  swarm(feed)

  return feed
}
