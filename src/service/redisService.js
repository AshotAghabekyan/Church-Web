import { createClient } from "redis";



class RedisService {
    #redisClient

    constructor() {
        createClient({
            "url": `${process.env.internalRedisUrl}`,
        }).connect()
            .then((redisClient) => this.#redisClient = redisClient)
            .catch((error) => console.log("redis connection error -->", error))
            // .then((redisClient) => redisClient.select(process.env.redisDbIndex))
    }


    async setValue(key, value) {
        const result = await this.#redisClient.set(String(key), JSON.stringify(value));
        await this.#redisClient.sendCommand(["EXPIRE", String(key), "604800"])
        return result;
    }

    async getValue(key) {
        const targetValue = await this.#redisClient.get(key);
        return JSON.parse(targetValue);
    }

    async deleteValue(key) {
        const result = await this.#redisClient.del(key);
        return result;
    }
}


export default new RedisService();