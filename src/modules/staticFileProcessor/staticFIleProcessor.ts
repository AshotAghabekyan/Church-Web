import {Request, Response} from "express";
import path from "node:path";
import fs from "node:fs";
import { Compressor } from "../compressor/compressor";
import { MimeType } from "../mimetypes/mimetypes";
import { FileStreamProcessor } from "../streamProcessor/streamProcessor";



interface StaticFileProcessorOption {
    compress?: {
        compressor: Compressor;
        encoding: string;
    },
    setHeader?: (req: Request, res: Response) => void,
    staticFilesDir: string;
}



export class StaticFileProcessor {
    public reqUrl: string;
    public options: StaticFileProcessorOption;
    private readonly compressor: Compressor;

    constructor(reqUrl: string, options: StaticFileProcessorOption) {
        this.reqUrl = reqUrl;
        this.options = options;
        this.compressor = options.compress.compressor;
    }


    public async process(req: Request, res: Response) {
        try {
            const staticFilePath: string = path.resolve(`./${this.options.staticFilesDir}${this.reqUrl}`);
            const mimeType: string = MimeType.fileMimeType(staticFilePath);
            const stats = await fs.promises.stat(staticFilePath);
            const eTag = `${stats.mtimeMs}-${stats.size}`;

            if (req.headers['if-none-match'] == eTag) {
                res.status(304).end();
                return;
            }
            res.setHeader('eTag', eTag);
            res.setHeader('cache-control', 'public, max-age=3600');
            res.setHeader('content-type', mimeType);
            if (this.options.setHeader) { //custom headers by option's "setHeader" method;
                this.options.setHeader(req, res);
            }

            if (mimeType.startsWith('image/') || mimeType.startsWith('font/') || !this.options.compress) {
                this.processDirectly(req, res, staticFilePath);
                return;
            }

            const validAcceptEncodings: string[] = req.headers['accept-encoding'].toString().split(", ");
            const currentCompressEncoding: string = this.options.compress.encoding

            if (validAcceptEncodings.includes(currentCompressEncoding)) {
                res.setHeader('content-encoding', currentCompressEncoding);
                this.processByCompressing(req, res, staticFilePath);
                return;
            }
            this.processDirectly(req, res, staticFilePath);
        }
        catch(error) {
            console.error(error);
            res.status(500).end();
        }
    }



    private processByCompressing(req: Request, res: Response, staticFilePath: string) {
        try {
            const gzip = this.compressor.compress(staticFilePath);
            const streamTransfer = new FileStreamProcessor();
            streamTransfer.transferData(gzip, res);
            streamTransfer.on("finish", () => {
                res.status(200).end();
            });
            streamTransfer.on('error', () => {
                throw new Error('response streaming error');
            })
        }
        catch (error) {
            console.error(error);
            res.status(500).end();
        }
    }
    


    public processDirectly(req: Request, res: Response, staticFilePath: string) {
        try {  
            const streamTransfer = new FileStreamProcessor();
            streamTransfer.transferData(staticFilePath, res);
            streamTransfer.on("finish", () => {
                res.status(200).end();
            })
            streamTransfer.on('error', () => {
                throw new Error('response streaming error');
            })

        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    }    
}