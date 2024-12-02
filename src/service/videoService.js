import youtubeApi from "googleapis/build/src/apis/youtube/v3.js";
import redisService from "./redisService.js";
import path from "path";



process.loadEnvFile(path.resolve(".env"))


export class FetchVideoService {
    #youtubeApi;

    constructor() {
        const apiKey = process.env.API_KEY;
        this.#youtubeApi = new youtubeApi.youtube_v3.Youtube({ auth: apiKey });
    }



    async #fetchChannelIdByName(channelName) {
        try {
            const response = await this.#youtubeApi.search.list({
                part: "id",
                q: channelName,
                type: "channel",
            });

            const channel = response.data.items?.[0]?.id?.channelId;
            if (!channel) throw new Error("Channel not found");
            return channel;
        } 
        catch (error) {
            console.error("Error fetching channel ID:", error.message);
            throw error;
        }
    }


    async #fetchChannelDetails(channelId) {
        try {
            const response = await this.#youtubeApi.channels.list({
                part: "contentDetails",
                id: channelId,
            });

            return response.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        } 
        catch (error) {
            console.error("Error fetching channel details:", error.message);
            throw error;
        }
    }

    async #fetchPlaylistItems(playlistId, videoCount) {
        try {
            const response = await this.#youtubeApi.playlistItems.list({
                part: "snippet",
                playlistId,
                maxResults: videoCount,
            });

            return response.data.items;
        } 
        catch (error) {
            console.error("Error fetching playlist items:", error.message);
            throw error;
        }
    }

    async getVideos(count) {
        try {
            const channelName = process.env.channelName;
            const cacheKey = `videos_${channelName}_${count}`;
            const cachedVideos = await redisService.getValue(cacheKey);

            if (cachedVideos) {
                return JSON.parse(cachedVideos);
            }

            const channelId = await this.#fetchChannelIdByName(channelName);
            const playlistId = await this.#fetchChannelDetails(channelId);
            const videos = await this.#fetchPlaylistItems(playlistId, count);
            await redisService.setValue(cacheKey, videos);
            return videos;
        } 
        catch (error) {
            console.error("Error fetching videos:", error.message);
            return [];
        }
    }
}

