import express from "express";
import { middlewareLogResponse } from "./api/middleware.js";
import { handlerReadiness } from "./api/readiness/readiness.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponse);
app.use('/app', express.static("./src/app"));
app.get("/healthz", handlerReadiness);
app.listen(PORT, (err?: any) => {
    if (err) {
        console.error("Error starting server:", err.message);
        return;
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});