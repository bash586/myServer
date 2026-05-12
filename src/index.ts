import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

import express from "express";
import {
    middlewareLogResponse, middlewareMetricsInc, middlewareError
} from "./api/middleware.js";
import { handlerReadiness } from "./api/readiness/readiness.js";
import { handlerResetViewsCount } from "./api/reset.js";
import { handlerGetViewsCount } from "./api/metrics.js";
import { handlerValidateChirp } from "./api/chirps.js";
import { config } from "./config.js";

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(middlewareLogResponse);
app.use('/app', middlewareMetricsInc, express.static("./src/app"));

app.get('/admin/metrics', (req, res, next) => {
    Promise.resolve(handlerGetViewsCount(req, res)).catch(next)
});
app.post('/admin/reset', (req, res, next) => {
    Promise.resolve(handlerResetViewsCount(req, res)).catch(next);
});

app.get("/api/healthz", (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.post("/api/validate_chirp", (req, res, next) => {
    Promise.resolve(handlerValidateChirp(req, res)).catch(next);
});

app.use(middlewareError);

app.listen(PORT, (err?: any) => {
    if (err) {
        console.error("Error starting server:", err.message);
        return;
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});