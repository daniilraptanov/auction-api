
const DEFAULT_PORT = 5000;

enum Environment {
    DEV = 'development',
    PROD = 'production',
    TEST = 'testing'
}

export class Config {
    static app = {
        PORT: parseInt(process.env['PORT']) || DEFAULT_PORT,
        JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
        NODE_ENV: process.env['NODE_ENV'] || Environment.DEV,
    }

    static db = {
        DATABASE_URL: process.env['DATABASE_URL'],
    }

    static get isProduction() {
        return Config.app.NODE_ENV === Environment.PROD;
    }
}
