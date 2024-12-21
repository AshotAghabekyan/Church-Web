import path from "node:path";




const MimeTypes: Record<string, string> = {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': "image/webp",
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
};



export class MimeType {

    static fileMimeType(filePath: string) {
        const extension: string = path.extname(filePath);
        const mimeType = MimeTypes[extension] || 'application/octet-stream';
        return mimeType;
    }
}
