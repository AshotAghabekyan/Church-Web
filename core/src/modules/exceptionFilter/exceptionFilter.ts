// deno-lint-ignore-file



// src/middleware/ExceptionFilter.ts
import { Request, Response, NextFunction } from 'express';
import { HttpException } from "./httpExceptions.ts";
import path from "node:path";


export class ExceptionFilter {
    static catch(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpException) {
            // Handle HttpException
            return res.status(err.statusCode).render(path.resolve('public/common/exception/exception.hbs'), {
                title: 'Ooops',
                errorMessage: err.message,
                errorCode: err.statusCode,
            });
        }

        // Handle unexpected errors
        console.error(err);  // log the error for debugging purposes
        return res.status(500).render(path.resolve('public/common/exception/exception.hbs'), {
            title: 'error',
            errorMessage: 'Internal server error',
            errorCode: 500,
        });
    }
}
