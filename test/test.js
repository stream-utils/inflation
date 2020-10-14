
var Readable = require('readable-stream').Readable
var inflation = require('..')
var should = require('should')

describe('inflate(stream, options)', function () {
  it('should require stream argument', function () {
    inflation.should.throw(/stream.*required/)
  })

  it('should pass-through identity streams', function (done) {
    var stream = createStream(new Buffer('identity!', 'utf-8'))
    var string = 'identity!'
    assertBuffer(inflation(stream), string, done)
  })

  it('should inflate gzip streams', function (done) {
    var stream = createStream(new Buffer('1f8b080000000000000b4bcecf2d284a2d2e4e4d510400fb94f3640b000000', 'hex'))
    var string = 'compressed!'
    var opts = {encoding: 'gzip'}
    assertBuffer(inflation(stream, opts), string, done)
  })

  it('should inflate deflate streams', function (done) {
    var stream = createStream(new Buffer('789c4bcecf2d284a2d2e4e4d5104001b960457', 'hex'))
    var string = 'compressed!'
    var opts = {encoding: 'deflate'}
    assertBuffer(inflation(stream, opts), string, done)
  })

  it('should pass-through identity streams', function (done) {
    var stream = createStream(new Buffer('identity!', 'utf-8'))
    var string = 'identity!'
    stream.headers = {}
    assertBuffer(inflation(stream), string, done)
  })

  describe('stream with headers', function () {

    it('should pass-through identity streams', function (done) {
      var stream = createStream(new Buffer('identity!', 'utf-8'))
      var string = 'identity!'
      stream.headers = {'content-encoding': 'identity'}
      assertBuffer(inflation(stream), string, done)
    })

    it('should pass-through utf-8 streams', function (done) {
      var stream = createStream(new Buffer('identity!', 'utf-8'))
      var string = 'identity!'
      stream.headers = {'content-encoding': 'utf-8'}
      assertBuffer(inflation(stream), string, done)
    })

    it('should inflate gzip streams', function (done) {
      var stream = createStream(new Buffer('1f8b080000000000000b4bcecf2d284a2d2e4e4d510400fb94f3640b000000', 'hex'))
      var string = 'compressed!'
      stream.headers = {'content-encoding': 'gzip'}
      assertBuffer(inflation(stream), string, done)
    })

    it('should inflate deflate streams', function (done) {
      var stream = createStream(new Buffer('789c4bcecf2d284a2d2e4e4d5104001b960457', 'hex'))
      var string = 'compressed!'
      stream.headers = {'content-encoding': 'deflate'}
      assertBuffer(inflation(stream), string, done)
    })

    it('should throw on unknown encoding', function () {
      var err
      var stream = createStream(new Buffer('0000', 'hex'))
      stream.headers = {'content-encoding': 'bogus'}
      try {
        inflation(stream)
      } catch (e) {
        err = e
      }
      should(err).be.ok
      err.message.should.match(/Unsupported Content-Encoding/)
      err.status.should.equal(415)
    })
  })
})

function assertBuffer(stream, string, done) {
  var buf = []
  stream.on('data', function ondata(chunk) {
    buf.push(chunk)
  })
  stream.on('end', function onend() {
    buf = Buffer.concat(buf)
    buf.toString().should.equal(string)
    done()
  })
}

function createStream(buf) {
  var stream = new Readable()

  stream._read = function read() {
    stream.push(buf)
    stream.push(null)
  }

  return stream
}
