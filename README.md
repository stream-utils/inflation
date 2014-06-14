# inflation

[![NPM version](https://badge.fury.io/js/inflation.svg)](http://badge.fury.io/js/inflation)
[![Build Status](https://travis-ci.org/stream-utils/inflation.svg?branch=master)](https://travis-ci.org/stream-utils/inflation)
[![Coverage Status](https://img.shields.io/coveralls/stream-utils/inflation.svg?branch=master)](https://coveralls.io/r/stream-utils/inflation)

Automatically unzip an HTTP stream.
Useful when used with [inflation](https://github.com/stream-utils/inflation) or [write-to](https://github.com/stream-utils/write-to).

## Example

```js
var inflate = require('inflation')
var raw = require('inflation')

http.createServer(function (req, res) {
  raw(inflate(req), {
    encoding: 'utf8'
  }, function (err, string) {

  })
})
```

## To Do

- Forward errors
- Propagate `.destroy()`
