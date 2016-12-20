var namedLevel = require('named-level-store')
var swarm = require('hyperdiscovery')
var hypercore = require('hypercore')
var assert = require('assert')
var xtend = require('xtend')
var level = require('level')
var path = require('path')
var fs = require('fs')

module.exports = Normcore

function Normcore (name, opts) {
  opts = opts || {}

  assert.equal(typeof name, 'string', 'normcore: name must be a string')
  assert.equal(typeof opts, 'object', 'normcore: opts must be an object')

  var isPath = /\/.*/.test(name)
  var isHex = /^[0-9a-f]{64}$/.test(name)

  if (!isPath) {
    name = (isHex)
      ? name
      : new Buffer(name).toString('hex')
  }

  var db = (isPath)
    ? level(name)
    : namedLevel(name)

  var location = (isPath)
    ? name
    : db.location

  var secretKeyPath = path.join(location, 'SECRET_KEY')
  var keyPath = path.join(location, 'KEY')
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

  var _swarm = swarm(feed, opts)
  feed._swarm = _swarm

  return feed
}
