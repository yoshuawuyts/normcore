#!/usr/bin/env node

const normcore = require('./')

const feed1 = normcore('normies-norman-norway')
const key = feed1.key.toString('hex')
process.stdin.pipe(feed1.createWriteStream())
console.log('key is: ' + key)

const feed2 = normcore(key)
feed2.createReadStream().on('data', function (data) {
  console.log('feed2: ' + data.toString())
})
