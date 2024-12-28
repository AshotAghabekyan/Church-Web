

export class HttpException extends Error {
    statusCode: number;
    override message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}



export class NotFoundException extends HttpException {
    constructor(message: string = 'Resource not found') {
        super(404, message);
    }
}



export class InternalErrorException extends HttpException {
    constructor(message: string = 'Internal Server Error') {
        super(500, message);
    }
}