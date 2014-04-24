
var zlib = require('zlib')

module.exports = inflate

function inflate(stream, options) {
  options = options || {}

  var encoding = options.encoding
    || (stream.headers && stream.headers['content-encoding'])
    || ''

  switch (encoding) {
  case 'gzip':
  case 'deflate':
    break
  case '':
    return stream
  default:
    throw new Error('Unsupported Content-Encoding: ' + encoding)
  }

  return stream.pipe(zlib.Unzip(options))
}
