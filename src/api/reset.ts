import { Response, Request } from "express";
import { apiConfig } from "../config.js";

export function handlerResetViewsCount(req: Request, res: Response) {
    apiConfig.fileserverHits = 0;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send("OK");
}