
import { google, youtube_v3 } from "googleapis";
import { RedisService } from "../redis/cacheProvider";
import path from "path";



process.loadEnvFile(path.resolve(".env"))


export class VideoContentProvider {
    private readonly youtubeApi: youtube_v3.Youtube;
    private redisService: RedisService<youtube_v3.Schema$PlaylistItem[]>;

    constructor() {
        const apiKey: string = process.env.API_KEY;
        this.youtubeApi = google.youtube({
            version: 'v3',
            auth: apiKey,
        });
        this.redisService = new RedisService<youtube_v3.Schema$PlaylistItem[]>()

    }
    

    private async fetchChannelIdByName(channelName: string): Promise<string> {
        try {
            const response = await this.youtubeApi.search.list({
                part:["id"],
                q: channelName,
                type: ["channel"],
            });

            const channelId: string = response.data.items?.[0].id.channelId;
            if (!channelId) throw new Error("Channel not found");
            return channelId;
        } 
        catch (error: any) {
            console.error("Error fetching channel ID:", error.message);
            throw error;
        }
    }


    private async fetchChannelDetails(channelId: string): Promise<string> {
        try {
            const response = await this.youtubeApi.channels.list({
                part: ["contentDetails"],
                id: [channelId],
            });
            return response.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads!;
        } 
        catch (error: any) {
            console.error("Error fetching channel details:", error.message);
            throw error;
        }
    }

    private async fetchPlaylistItems(playlistId: string, videoCount: number): Promise<youtube_v3.Schema$PlaylistItem[]> {
        try {
            const response = await this.youtubeApi.playlistItems.list({
                part: ["snippet"],
                playlistId: playlistId,
                maxResults: videoCount,
            });

            return response.data.items;
        } 
        catch (error: any) {
            console.error("Error fetching playlist items:", error.message);
            throw error;
        }
    }


    public async getVideos(count: number) {
        try {
            const channelName: string = process.env.channelName!;
            const cacheKey: string = `videos_${channelName}_${count}`;
            const cachedVideos = await this.redisService.getValue(cacheKey);
            if (cachedVideos) {
                return cachedVideos;
            }

            const channelId: string = await this.fetchChannelIdByName(channelName);
            const playlistId: string = await this.fetchChannelDetails(channelId);
            const videos: youtube_v3.Schema$PlaylistItem[] = await this.fetchPlaylistItems(playlistId, count);
            await this.redisService.setValue(cacheKey, videos);
            return videos;
        } 
        catch (error: any) {
            console.error("Error fetching videos:", error.message);
            return [];
        }
    }
}


