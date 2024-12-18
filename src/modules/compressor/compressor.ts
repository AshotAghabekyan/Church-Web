import fs, { ReadStream } from "node:fs";
import zlib from "node:zlib";




export class Compressor {

    public gzipCompress(filePath: string) {
        const readStream: ReadStream = fs.createReadStream(filePath, "utf-8");
        const gzip = zlib.createGzip();
        readStream.pipe(gzip);
        return gzip;        
    }
}