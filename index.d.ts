import { Readable } from 'stream'

/**
 * Returns a stream that emits inflated data from the given stream.
 */
declare function inflate(req: Readable, options?: inflate.Options): Readable;

export = inflate;

declare namespace inflate {
  interface Options {
    /**
     * The encoding of the stream (`gzip` or `deflate`). If not given, will look in `stream.headers['content-encoding']`.
     */
    gzip?: 'deflate' | 'gzip';
  }
}
