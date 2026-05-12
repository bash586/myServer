import { Response, Request } from "express";
import { BadRequestError } from "./errors.js";

type Chirp = {
    body: string,
};
const PROFANE = ["kerfuffle", "fornax", "sharbert"];

function isValidChirp(chirp: unknown): chirp is Chirp {
    return (chirp != null && typeof chirp == "object" && "body" in chirp);
}

export async function handlerValidateChirp(req: Request, res: Response) {
    const parsedBody = req.body;

    if (!isValidChirp(parsedBody)) {
        throw new BadRequestError("Chirp body is required");
    }

    const bodyMsg: string = parsedBody.body;

    if (bodyMsg.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    }

    const responseBody = {
        cleanedBody: cleanBody(bodyMsg)
    };

    res.header("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(responseBody));
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