# svg-to-image

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Converts a string of SVG into an `HTMLImageElement` using `Blob` and `URL.createObjectURL`. Falls back to `encodeURIComponent` for unsupported browsers, such as Safari 8.0.

## Install

```sh
npm install svg-to-image --save
```

## Example

A common use case for this is rendering SVG to a 2D or WebGL canvas.

```js
var svgToImage = require('svg-to-image')
var getContext = require('get-canvas-context')

// set up a new Canvas2D
var context = getContext('2d', {
  width: 200, height: 200
})

var data = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200px" height="200px">',
    '<circle stroke-width="12" r="43" cx="50" cy="50" fill="none" stroke="#3A5"/>',
    '<circle r="6" cx="59" cy="23" fill="#000"/>',
    '<g stroke-linejoin="round" stroke-linecap="round" stroke-width="1" stroke="#000" fill="none">',
      '<path d="M36,36c5,0,3,2,8-1c1,2,1,3,3,2c3,0-6,7-3,8c-4-2-9,2-14-2c4-3,4-4,5-7c5,0,8,2,12,1"/>',
      '<path fill="#000" d="M34,29h31c2,5,7,10,7,16l-8,1l8,1l-3,31l-5,-18l-11,18l5-34l-3-8z"/>',
      '<path stroke-width="2" d="M27,48h23M28,49h21l-3,28h-14l-4,-28h5l3,28h3v-28h5l-2,28m3-4h-13m-1-5h16m0-5h-16m-1-5h18m0-5h-19"/>',
    '</g>',
    '<path stroke="#F00" stroke-width="1"/>',
  '</svg>'
].join('\n')

svgToImage(data, function (err, image) {
  if (err) throw err

  // draw image to canvas
  context.drawImage(image, 0, 0)

  // append to DOM
  var canvas = context.canvas
  document.body.appendChild(context.canvas)

  // open a PNG image the user can Right Click -> Save As
  window.open(context.canvas.toDataURL('image/png'))
})
```

Result:

![svgImage](http://i.imgur.com/MCXkoDu.png)

In Chrome and FireFox, you can also use this method for rendering DOM to canvas, by using `<foreignObject>` and well-formatted HTML.

```js
var data = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">',
    '<foreignObject width="100%" height="100%">',
      '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">',
      '<em>I</em> like ', 
      '<span style="color:white; text-shadow:0 0 2px blue;">',
      'cheese</span>',
      '</div>',
    '</foreignObject>',
  '</svg>'
].join('\n')
```

### Gotchas

- The `<svg>` element should have both `width` and `height` fields, otherwise it may lead to undefined results
- Rendering DOM needs to be wrapped in `<foreignObject>`, be well-formatted, and the root element should use the correct XML namespace
- Only latest Chrome and FireFox have been tested with `<foreignObject>`

## Usage

[![NPM](https://nodei.co/npm/svg-to-image.png)](https://www.npmjs.com/package/svg-to-image)

#### `svgToImage(svg, [opt], [cb])`

Converts the given `svg` string data into an `HTMLImageElement`, which can then be used to render to canvas.

You can optionally specify an `opt.crossOrigin` string, or omit the `opt` object. 

The callback is called with `(err, image)` parameters, where `err` will be non-null in the case of a failure, and `image` is the rendered image.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/svg-to-image/blob/master/LICENSE.md) for details.
