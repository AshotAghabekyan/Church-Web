import dotenv from "dotenv";
import pg from "pg";

dotenv.config()
const PGHOST=process.env.PGHOST
const PGDATABASE=process.env.DATABASE
const PGPASSWORD=process.env.PASSWORD
const PGPORT=process.env.PGPORT



class PostgreSqlClient {
    #pg;

    constructor() {
        this.#initPgClient();
    }

    
    async #initPgClient() {
        try {
            this.#pg = new pg.Pool({
                host: PGHOST,
                user: "postgres",
                database: PGDATABASE,
                password: PGPASSWORD,
                port: PGPORT,
            });
            await this.#pg.connect();
            console.log("success connect to postgresql")
        }
        catch(error) {
            console.log("postgresql connection error --> ", error);
        }
    }


    async query(text, params) {
        try {
            const result = await this.#pg.query(text, params);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default PostgreSqlClient;