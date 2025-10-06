import { get } from "env-var";

export const envs = {
    PORT: get('PORT').required().asPortNumber(),

    POSTGRES_URL: get('POSTGRES_URL').required().asString(),
    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),
    POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
    
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB: get('MONGO_DB').required().asString(),
    MONGO_USER: get('MONGO_USER').required().asString(),
    MONGO_PASS: get('MONGO_PASS').required().asString(),
}

