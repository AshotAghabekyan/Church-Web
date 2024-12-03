
import { createClient } from '@redis/client';
import { RedisClientType } from 'redis';


export class RedisService<StoredValueType> {
    private redisClient: RedisClientType;

    constructor() {
        this.init()
            .then(() => console.log("success connect to redis"))
            .catch((error) => console.log("redis connection error", error));
    }

    private async init(): Promise<void> {
        try {
            this.redisClient = createClient({
                url: process.env.redisUrl,
                database: +process.env.redisDbIndex || 0,
            })
            await this.redisClient.connect();
            this.redisClient.on('error', (err: any) => {
                console.error('Redis client error:', err);
            });
        } 
        catch(error) {
            console.log("redis error -->", error);
        }
    }

    public async setValue(key: string, value: StoredValueType): Promise<void> {
        try {
            await this.redisClient.set(String(key), JSON.stringify(value));
            await this.redisClient.sendCommand(["EXPIRE", String(key), "604800"]);
        } catch (error) {
            console.error('set value error', error);
            throw error; 
        }
    }

    public async getValue(key: string): Promise<StoredValueType> {
        try {
            const targetValue = await this.redisClient.get(key);
            return JSON.parse(targetValue);
        } catch (error) {
            console.error('get value error', error);
            throw error;
        }
    }

    public async deleteValue(key: string): Promise<number> {
        try {
            const result: number = await this.redisClient.del(key);
            return result;
        } catch (error) {
            console.error('delete value error', error);
            throw error;
        }
    }
}
