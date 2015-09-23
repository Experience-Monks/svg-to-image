var svgToImage = require('./')
var test = require('tape')
var lipsum = require('lorem-ipsum')

test('should convert SVG to image', function (t) {
  t.plan(2)
  
  var text = lipsum({
    count: 8
  })
  var width = 400
  var height = 300

  var data = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">',
    '<foreignObject width="100%" height="100%">',
    '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:20px; background-color: #e1e1e1;">',
    '<span style="color:white; text-shadow:5px 5px 15px red; display: block;">',
    'Some styled text</span>',
    text,
    '</div>',
    '</foreignObject>',
    '</svg>'
  ]
  
  svgToImage(data, function (err, image) {
    if (err) return t.fail(err)
    document.body.appendChild(image) // for visualizing it...
    t.equal(image.width, width, 'matches width')
    t.equal(image.height, height, 'matches height')
  })
})