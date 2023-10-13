# inflation

[![NPM version](https://badge.fury.io/js/inflation.svg)](http://badge.fury.io/js/inflation)
[![CI](https://github.com/stream-utils/inflation/actions/workflows/nodejs.yml/badge.svg)](https://github.com/stream-utils/inflation/actions/workflows/nodejs.yml)

Automatically unzip an HTTP stream.

## API

```js
var inflate = require('inflation')
```

### inflate(stream, options)

Returns a stream that emits inflated data from the given stream.

Options:

- `encoding` - The encoding of the stream (`gzip` or `deflate`).
  If not given, will look in `stream.headers['content-encoding']`.
- `brotli` - [`BrotliOptions`](https://nodejs.org/api/zlib.html#class-brotlioptions) to use for Brotli decompression

## Example

```js
var inflate = require('inflation')
var raw     = require('raw-body')

http.createServer(function (req, res) {
  raw(inflate(req), 'utf-8', function (err, string) {
    console.dir(string)
  })
})
```
