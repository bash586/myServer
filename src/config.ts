import { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile('./.env');
envOrThrow("DB_URL");


type DBConfig = {
    url: string,
    migrationConfig: MigrationConfig
};

type APIConfig = {
    api: {
        fileserverHits: number;
        port: number,
    }
    db: DBConfig;
};

export const config: APIConfig = {
    api: {
        fileserverHits: 0,
        port: Number(envOrThrow("PORT")),
    },
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig: {
            migrationsFolder: "./src/db/migrations"
        }
    },
};

function envOrThrow(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}