import { NextFunction, Response, Request } from "express";

export function middlewareLogResponse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.on('finish', () => {
        const isOk = res.statusCode >= 200 && res.statusCode < 300;
        if (!isOk) {
            console.log(
                `[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`
            );
        }
    });
    next();
}