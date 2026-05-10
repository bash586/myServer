import { Response, Request, response } from "express";

type Chirp = {
    body: string,
};
const PROFANE = ["kerfuffle", "fornax", "sharbert"];

function isValidChirp(chirp: unknown): chirp is Chirp {
    return (chirp != null && typeof chirp == "object" && "body" in chirp);
}

export function handlerValidateChirp(req: Request, res: Response) {
    const responseBody: Record<string, any> = {};
    let statusCode = 200;
    try {
        const parsedBody = req.body;

        if (isValidChirp(parsedBody)) {
            const bodyMsg: string = parsedBody.body;

            if (bodyMsg.length > 140) {
                responseBody["error"] = "Chirp is too long";
                statusCode = 400;
            }
            if (statusCode == 200) {
                responseBody["cleanedBody"] = cleanBody(bodyMsg);
            }
        }
    } catch (err) {
        responseBody["error"] = "Something went wrong";
        statusCode = 400;
    }
    res.header("Content-Type", "application/json");
    res.status(statusCode).send(JSON.stringify(responseBody));
}

function cleanBody(body: string) {
    const bodySplit = body.split(" ");
    bodySplit.map((word: string, index: number) => {
        if (PROFANE.includes(word.toLowerCase())) {
            bodySplit[index] = "****";
        }
    });
    return bodySplit.join(" ");
}