import fs, { ReadStream } from "node:fs";
import { Transform } from "node:stream";
import zlib, { BrotliCompress, BrotliDecompress, Gunzip } from "node:zlib";
import { FileStreamProcessor } from "../streamProcessor/streamProcessor";



export abstract class Compressor {
    protected readonly fileStream = new FileStreamProcessor();

    protected cleanUp(readStream: ReadStream, transformStream: Transform): void {
        if (!readStream.destroyed) readStream.close();
        // if (!transformStream.destroyed) transformStream.destroy();
    }

    protected emergencyClenUp(readStream: ReadStream, transformStream: Transform): void {
        if (!readStream.destroyed) readStream.destroy();
        // if (!transformStream.destroyed) transformStream.destroy();
    }

    abstract compress(filePath: string): Transform;
    abstract decompress(filePath: string): Transform;
}




export class GzipCompressor extends Compressor {
    constructor() {
        super();
    }

    public compress(filePath: string) {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const gzip = zlib.createGzip();
        this.fileStream.transferData(readStream, gzip);
        this.fileStream.on('finish', () => this.cleanUp(readStream, gzip))
        this.fileStream.on('error', () => this.emergencyClenUp(readStream, gzip));
        return gzip;        
    }


    public decompress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const gunzip: Gunzip = zlib.createGunzip();
        this.fileStream.transferData(readStream, gunzip);
        this.fileStream.on('finish', () => this.cleanUp(readStream, gunzip));
        this.fileStream.on('error', () => this.emergencyClenUp(readStream, gunzip));
        return gunzip;
    }
}




export class BrotliCompressor extends Compressor  {
    constructor() {
        super();
    }

    public compress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const brotliCompress: BrotliCompress = zlib.createBrotliCompress();
        this.fileStream.transferData(readStream, brotliCompress);
        this.fileStream.on('finish', () => this.cleanUp(readStream, brotliCompress));
        this.fileStream.on('error', () => this.emergencyClenUp(readStream, brotliCompress));
        return brotliCompress;
    }


    public decompress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const brotliDecompress: BrotliDecompress = zlib.createBrotliDecompress();
        this.fileStream.transferData(readStream, brotliDecompress);
        this.fileStream.on("finish", () => this.cleanUp(readStream, brotliDecompress));
        this.fileStream.on('error', () => this.emergencyClenUp(readStream, brotliDecompress));
        return brotliDecompress;
    }
}
