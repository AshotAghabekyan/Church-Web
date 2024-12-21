import fs, { ReadStream } from "node:fs";
import { Transform } from "node:stream";
import zlib, { BrotliCompress, BrotliDecompress, Gunzip } from "node:zlib";


export interface Compressor {
    compress(filePath: string): Transform;
    decompress(filePath: string): Transform;
}


export class GzipCompressor implements Compressor {
    // private fileProcessor
    constructor() {

    }

    public compress(filePath: string) {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const gzip = zlib.createGzip();
        readStream.pipe(gzip);
        gzip.once("finish", () => gzip.close());
        return gzip;        
    }


    public decompress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const gunzip: Gunzip = zlib.createGunzip();
        readStream.pipe(gunzip);
        gunzip.on("finish",() => gunzip.close());
        return gunzip;
    }
}




export class BrotliCompressor implements Compressor {
    constructor() {}

    public compress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const brotliCompress: BrotliCompress = zlib.createBrotliCompress();
        readStream.pipe(brotliCompress);
        brotliCompress.once("finish", () => brotliCompress.close());
        return brotliCompress;
    }

    public decompress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const brotliDecompress: BrotliDecompress = zlib.createBrotliDecompress();
        readStream.pipe(brotliDecompress);
        brotliDecompress.once("finish", () => brotliDecompress.close());
        return brotliDecompress;
    }
}
