
const DEFAULT_PORT = 5000;

enum Environment {
    DEV = 'development',
    PROD = 'production',
    TEST = 'testing'
}

export class Config {
    static app = {
        PORT: DEFAULT_PORT,
        JWT_SECRET_KEY: undefined,
        NODE_ENV: Environment.DEV
    }

    static db = {
        DATABASE_URL: undefined
    }

    static get isProduction() {
        return Config.app.NODE_ENV === Environment.PROD;
    }

    static setVariables() {
        Config.app = {
            PORT: parseInt(process.env['PORT']),
            JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
            NODE_ENV: process.env['NODE_ENV'] as Environment,
        }

        Config.db = {
            DATABASE_URL: process.env['DATABASE_URL']
        }

        if (!Config.app.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY not provided.");
        }

        if (!Config.db.DATABASE_URL) {
            throw new Error("DATABASE_URL not provided.");
        }
    }
}
