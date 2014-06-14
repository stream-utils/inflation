# inflation

[![NPM version](https://badge.fury.io/js/inflation.svg)](http://badge.fury.io/js/inflation)
[![Build Status](https://travis-ci.org/stream-utils/inflation.svg?branch=master)](https://travis-ci.org/stream-utils/inflation)
[![Coverage Status](https://img.shields.io/coveralls/stream-utils/inflation.svg?branch=master)](https://coveralls.io/r/stream-utils/inflation)

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

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
