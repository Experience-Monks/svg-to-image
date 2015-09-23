var svgToImage = require('./')
var test = require('tape')

test('convert SVG text to a Image that can be drawn in canvas', function (t) {
  t.plan(3)
  var async = true
  svgToImage('foobar', function (err) {
    async = false
    t.equal(err.message, 'window global is undefined; not in a browser', 'gets an error in node')
  })
  svgToImage('foobar', { crossOrigin: 'Anonymous' }, function () {
    async = false
    t.ok(true, 'overloads with options object')
  })
  t.equal(async, true, 'function is asynchronous')
})
