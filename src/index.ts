import express from "express";
import { middlewareLogResponse, middlewareMetricsInc } from "./api/middleware.js";
import { handlerReadiness } from "./api/readiness/readiness.js";
import { handlerResetViewsCount } from "./api/reset.js";
import { handlerGetViewsCount } from "./api/metrics.js";
import { handlerValidateChirp } from "./api/chirps.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(middlewareLogResponse);

app.use('/app', middlewareMetricsInc, express.static("./src/app"));
app.get('/admin/metrics', handlerGetViewsCount);
app.post('/admin/reset', handlerResetViewsCount);
app.get("/api/healthz", handlerReadiness);
app.post("/api/validate_chirp", handlerValidateChirp);
app.listen(PORT, (err?: any) => {
    if (err) {
        console.error("Error starting server:", err.message);
        return;
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});