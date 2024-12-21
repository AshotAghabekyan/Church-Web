import fs, { ReadStream, WriteStream } from "fs";
import EventEmitter from "events";
import { Readable, Writable } from "stream";




export class FileStreamProcessor {
    private eventEmitter: EventEmitter;

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    public transferData(source: string | Readable, destination: string | Writable): void {
        let readStream: Readable;
        let writeStream: Writable;

        if (typeof source === "string") {
            readStream = fs.createReadStream(source);
        } 
        else {
            readStream = source;
        }

        if (typeof destination === "string") {
            writeStream = fs.createWriteStream(destination);
        } 
        else {
            writeStream = destination;
        }

        readStream.pipe(writeStream);

        readStream.once("error", (err) => {
            console.error(`Error reading from source: ${err.message}`);
            readStream.destroy();
            this.eventEmitter.emit("error");
        });

        writeStream.once("error", (err) => {
            console.error(`Error writing to destination: ${err.message}`);
            writeStream.destroy();
            this.eventEmitter.emit("error");
        });

        writeStream.once("finish", () => {
            this.eventEmitter.emit("finish");
        });
    }

    public once(event: "error" | "finish", callback: () => void): void {
        this.eventEmitter.once(event, callback);
    }
}