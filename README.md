
# Inflation

Automatically unzip an HTTP stream.
Useful when used with [raw-body](https://github.com/stream-utils/raw-body) or [write-to](https://github.com/stream-utils/write-to).

## Example

```js
var inflate = require('inflation')
var raw = require('raw-body')

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
