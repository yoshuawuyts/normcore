const swarm = require('hyperdiscovery')
const level = require('named-level-store')
const hypercore = require('hypercore')
const assert = require('assert')
const path = require('path')
const fs = require('fs')

module.exports = Normcore

function Normcore (name, opts) {
  assert.equal(typeof name, 'string', 'normcore: name must be a string')
  const isHex = /^[0-9a-f]{64}$/.test(name)
  name = (isHex)
    ? name
    : new Buffer(name).toString('hex')

  const db = level(name)

  const secretKeyPath = path.join(db.location, 'SECRET_KEY')
  const keyPath = path.join(db.location, 'KEY')
  var defaultSecretKey = null
  var defaultKey = null

  if (fs.existsSync(keyPath)) {
    defaultKey = fs.readFileSync(keyPath)
    defaultSecretKey = fs.readFileSync(secretKeyPath)
  }

  const feedKey = isHex ? name : defaultKey
  const feed = hypercore(db).createFeed(feedKey, {
    secretKey: defaultSecretKey
  })

  if (!isHex) {
    fs.writeFileSync(secretKeyPath, feed.secretKey)
    fs.writeFileSync(keyPath, feed.key)
  }

  swarm(feed, opts)

  return feed
}
