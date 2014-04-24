
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
    var err = new Error('Unsupported Content-Encoding: ' + encoding)
    err.status = 415
    throw err
  }

  return stream.pipe(zlib.Unzip(options))
}
