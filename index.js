var level = require('named-level-store')
var swarm = require('hyperdiscovery')
var hypercore = require('hypercore')
var assert = require('assert')
var xtend = require('xtend')
var path = require('path')
var fs = require('fs')

module.exports = Normcore

function Normcore (name, opts) {
  opts = opts || {}

  assert.equal(typeof name, 'string', 'normcore: name must be a string')
  assert.equal(typeof opts, 'object', 'normcore: opts must be an object')

  var isHex = /^[0-9a-f]{64}$/.test(name)
  name = (isHex)
    ? name
    : new Buffer(name).toString('hex')

  var db = level(name)

  var secretKeyPath = path.join(db.location, 'SECRET_KEY')
  var keyPath = path.join(db.location, 'KEY')
  var defaultSecretKey = null
  var defaultKey = null

  if (fs.existsSync(keyPath)) {
    defaultKey = fs.readFileSync(keyPath)
    defaultSecretKey = fs.readFileSync(secretKeyPath)
  }

  opts = xtend(opts, { secretKey: defaultSecretKey })
  var feedKey = isHex ? name : defaultKey
  var feed = hypercore(db).createFeed(feedKey, opts)

  if (!isHex) {
    fs.writeFileSync(secretKeyPath, feed.secretKey)
    fs.writeFileSync(keyPath, feed.key)
  }

  swarm(feed, opts)

  return feed
}
