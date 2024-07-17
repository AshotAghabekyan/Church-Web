import { createClient } from '@redis/client';


class RedisService {
    #redisClient;

    constructor() {
        this.init()
            .then(() => console.log("success connect to redis"))
            .catch((error) => console.log("redis connection error", error));
    }

    async init() {
        try {
            this.#redisClient = createClient({
                url: process.env.redisUrl,
                database: process.env.redisDbIndex || 0,
            })
            await this.#redisClient.connect();
            this.#redisClient.on('error', (err) => {
                console.error('Redis client error:', err);
            });
        } 
        catch(error) {
            console.log("redis error -->", error);
        }
    }

    async setValue(key, value) {
        try {
            await this.#redisClient.set(String(key), JSON.stringify(value));
            await this.#redisClient.sendCommand(["EXPIRE", String(key), "604800"]);
        } catch (error) {
            console.error('set value error', error);
            throw error; 
        }
    }

    async getValue(key) {
        try {
            const targetValue = await this.#redisClient.get(key);
            return JSON.parse(targetValue);
        } catch (error) {
            console.error('get value error', error);
            throw error;
        }
    }

    async deleteValue(key) {
        try {
            const result = await this.#redisClient.del(key);
            return result;
        } catch (error) {
            console.error('delete value error', error);
            throw error;
        }
    }
}


export default new RedisService();