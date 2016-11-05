const test = require('tape')
const normcore = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(normcore)
})
