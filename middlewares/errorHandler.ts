import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
    statusCode?: number;
}

export default function errorHandler(
    err: ErrorWithStatus, 
    req: Request, 
    res: Response, 
    next: NextFunction) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';

        console.error('Error:', {
            message: err.message,
            stack: err.stack,
            url: req.url,
            method: req.method,
        });

        res.status(statusCode).json({
            error: message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
}