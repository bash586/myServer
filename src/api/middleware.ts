import { NextFunction, Response, Request } from "express";
import { config } from "../config.js";

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

export function middlewareMetricsInc(
    _: Request,
    __: Response,
    next: NextFunction
) {
    config.api.fileserverHits += 1;
    next();
}
export function middlewareError(
    err: any,
    _: Request,
    res: Response,
    __: NextFunction
) {
    if (err.statusCode) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.log("Something went wrong!");
        res.status(500).json({
            error: "Oops! Something went wrong on our end"
        });
    }
}
