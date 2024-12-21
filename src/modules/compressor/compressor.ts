import fs, { ReadStream } from "node:fs";
import { Transform } from "node:stream";
import zlib, { BrotliCompress, BrotliDecompress, Gunzip } from "node:zlib";
import { FileStreamProcessor } from "../streamProcessor/streamProcessor";



export interface Compressor {
    compress(filePath: string): Transform;
    decompress(filePath: string): Transform;
}



export class GzipCompressor implements Compressor {
    private fileStream: FileStreamProcessor
    constructor() {
        this.fileStream = new FileStreamProcessor();
    }

    public compress(filePath: string) {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const gzip = zlib.createGzip();
        this.fileStream.transferData(readStream, gzip);
        this.fileStream.once('finish', () => this.cleanUp(readStream, gzip))
        this.fileStream.once('error', () => this.emergencyClenUp(readStream, gzip));
        return gzip;        
    }


    public decompress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const gunzip: Gunzip = zlib.createGunzip();
        this.fileStream.transferData(readStream, gunzip);
        this.fileStream.once('finish', () => this.cleanUp(readStream, gunzip));
        this.fileStream.once('error', () => this.emergencyClenUp(readStream, gunzip));
        return gunzip;
    }


    private cleanUp(readStream: ReadStream, transformStream: Transform): void {
        if (!readStream.destroyed) readStream.close();
        if (!transformStream.destroyed) transformStream.destroy();
    }

    private emergencyClenUp(readStream: ReadStream, transformStream: Transform): void {
        if (!readStream.destroyed) readStream.destroy();
        if (!transformStream.destroyed) transformStream.destroy();
    }
}




export class BrotliCompressor implements Compressor {
    private fileStream: FileStreamProcessor
    constructor() {
        this.fileStream = new FileStreamProcessor();
    }

    public compress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const brotliCompress: BrotliCompress = zlib.createBrotliCompress();
        this.fileStream.transferData(readStream, brotliCompress);
        this.fileStream.once('finish', () => this.cleanUp(readStream, brotliCompress));
        this.fileStream.once('error', () => this.emergencyClenUp(readStream, brotliCompress));
        return brotliCompress;
    }


    public decompress(filePath: string): Transform {
        const readStream: ReadStream = fs.createReadStream(filePath);
        const brotliDecompress: BrotliDecompress = zlib.createBrotliDecompress();
        this.fileStream.transferData(readStream, brotliDecompress);
        this.fileStream.once("finish", () => this.cleanUp(readStream, brotliDecompress));
        this.fileStream.once('error', () => this.emergencyClenUp(readStream, brotliDecompress));
        return brotliDecompress;
    }


    private cleanUp(readStream: ReadStream, transformStream: Transform): void {
        if (!readStream.destroyed) readStream.close();
        if (!transformStream.destroyed) transformStream.destroy();
    }

    private emergencyClenUp(readStream: ReadStream, transformStream: Transform): void {
        if (!readStream.destroyed) readStream.destroy();
        if (!transformStream.destroyed) transformStream.destroy();
    }
}
