var loadImage = require('load-img')
var noop = function () {}

module.exports = svgToImage
function svgToImage (svg, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  cb = cb || noop
  opt = opt || {}

  if (typeof window === 'undefined') {
    return bail('window global is undefined; not in a browser')
  }

  var DOMURL = getURL()
  if (!DOMURL ||
    typeof DOMURL.createObjectURL !== 'function' ||
    typeof DOMURL.revokeObjectURL !== 'function') {
    return bail('browser does not support URL.createObjectURL')
  }

  if (typeof window.Blob === 'undefined') {
    return bail('browser does not support Blob constructor')
  }

  if (!Array.isArray(svg)) {
    svg = [ svg ]
  }

  var blob
  try {
    blob = new window.Blob(svg, {
      type: 'image/svg+xml;charset=utf-8'
    })
  } catch (e) {
    return bail(e)
  }

  var url = DOMURL.createObjectURL(blob)
  loadImage(url, opt, function (err, img) {
    DOMURL.revokeObjectURL(url)
    if (err) {
      // try again for Safari 8.0, using simple encodeURIComponent
      // this will fail with DOM content but at least it works with SVG
      var url2 = 'data:image/svg+xml,' + encodeURIComponent(svg.join(''))
      return loadImage(url2, opt, cb)
    }

    cb(err, img)
  })

  function bail (msg) {
    process.nextTick(function () {
      cb(new Error(msg))
    })
  }
}

function getURL () {
  return window.URL ||
  window.webkitURL ||
  window.mozURL ||
  window.msURL
}
