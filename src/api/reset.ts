import { Response, Request } from "express";
import { config } from "../config.js";

export async function handlerResetViewsCount(req: Request, res: Response) {
    config.api.fileserverHits = 0;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send("OK");
}