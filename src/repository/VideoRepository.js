import dotenv from "dotenv";
import PostgreSqlClient from "../db/postgreSql.js";

dotenv.config();
const videoTableName = process.env.VIDEO_TABLE_NAME;

class PostgreSqlVideoRepository {
    #pg;

    constructor() {
        this.#pg = new PostgreSqlClient();
        this.#video_table_init();
    }


    async #video_table_init() {
        try {
             await this.#pg.query(`
            CREATE TABLE IF NOT EXISTS ${videoTableName} (
                id BIGSERIAL PRIMARY KEY,
                link VARCHAR(200) NOT NULL,
                title VARCHAR(30) NOT NULL
            );
        `)
        }
        catch(error) {
            console.log("error when create TABLE for videos in db-->", error);
        }
    }


    async getAllVideos() {
        try {
            let queryResult =  await this.#pg.query(`
                SELECT * FROM ${videoTableName};
            `)
            console.log(queryResult.rows);
            return queryResult.rows;
        }
        catch(error) {
            console.log("error when getting all videos from db-->", error);
        }
    }


    async getVideosByCount(count) {
        try {
            let queryResult = await this.#pg.query(`
                SELECT * FROM ${videoTableName} LIMIT ${count};
            `)
            return queryResult.rows;
        }
        catch(error) {
            console.log("error when getting specefic count of vidoes from db -->", error);
        }
    }

    async getVideoById(id) {
        try {
            let queryResult = await this.#pg.query(`
                SELECT * FROM ${videoTableName} WHERE id = ${id};
            `)
            return queryResult.rows[0];
        }
        catch(error) {
            console.log("error when getting specefic video by id from db-->", error);
        }
    }

    async createVideo(videoMetadata) {
        try {
            console.log("video metadata ->", videoMetadata);
            let insertionResult = await this.#pg.query(`
                INSERT INTO ${videoTableName} (link, title) VALUES ($1, $2) RETURNING *;
            `, [videoMetadata.link, videoMetadata.title]);
            return insertionResult.rows[0]; 
        } catch(error) {
            console.log("error when inserting new instance into db -->", error);
            throw error; 
        }
    }
    

    async deleteVideoById(id) {
        try {
            let deletionResult = await this.#pg.query(`
                DELETE FROM ${videoTableName} WHERE id = ${id};
            `)
            console.log(deletionResult);
        }
        catch(error) {
            console.log("error when deleting specefic video")
        }
    }
}



export default PostgreSqlVideoRepository;
