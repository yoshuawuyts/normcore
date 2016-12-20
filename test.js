var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var path = require('path')
var test = require('tape')
var fs = require('fs')

var normcore = require('./')

test('supports local paths', function (t) {
  t.plan(3)
  var dir = path.join(__dirname, 'derp')
  mkdirp.sync(dir)
  var feed = normcore(dir)
  fs.stat(path.join(dir, 'SECRET_KEY'), function (err, res) {
    t.ifError(err, 'no err')
    t.ok(res)
    rimraf.sync(dir)
    closeFeed(feed, function (err) {
      t.ifError(err, 'no error closing feed')
    })
  })
})

function closeFeed (feed, cb) {
  feed.close(function (err) {
    if (err) return cb(err)
    feed._db.close(function (err) {
      if (err) return cb(err)
      feed._swarm.close(cb)
    })
  })
}
