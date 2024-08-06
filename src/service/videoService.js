import youtubeApi from "googleapis/build/src/apis/youtube/v3.js";
import redisService from "./redisService.js";

class VideoApiService {
    #apiKey = process.env.apiKey;
    #channelName = process.env.channelName;
    #youtubeApi;

    constructor() {
        this.#youtubeApi =  new youtubeApi.youtube_v3.Youtube({"auth": this.#apiKey})
    }


    async #getChannelIdByName(channelName) {
        try {
            let allChannelsByName = await this.#youtubeApi.search.list({
                part: 'id',
                q: channelName,
                type: 'channel',
              });
            
            if (allChannelsByName.data.items.length > 0) {
                return allChannelsByName.data.items[0].id.channelId;
            } else {
                throw new Error('Channel not found');
            }
        } catch(error) {
            console.log("get channel error -->", error);
            return null;
        }
    }


    async #getChannelLists(channelId) {
        try {
            let channelLists = await this.#youtubeApi.channels.list({
                part: 'contentDetails',
                id: channelId,
              });
              return channelLists;
        } catch(error) {
            console.log("get channel list error -->", error);
            return null;
        }
    }


    async #getplayListId(channelLists) {
        try {
            const playlistId = channelLists.data.items[0].contentDetails.relatedPlaylists.uploads;
            return playlistId;
        } catch(error) {
            console.log('get playlist ID error -->', error);
            return null;
        }
    }


    async #getPlaylistResponse(playlistItems, playlistId, videoCount) {
        try {
            let playlist = await playlistItems.list({
                part: "snippet",
                playlistId: playlistId,
                maxResults: videoCount, 
            });
            return playlist
        } catch(error) {
            console.log("get playlist response error -->", error);
            return null;
        }
    }


    #parsePlayList(playListResponseData) {
        try {
            let videos = playListResponseData.items.map(item => {
                item.snippet.videoLink = `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
                return item;
              });
              return videos;
        } catch(error) {
            console.log("playlist parsing error -->", error);
            return null;
        }
    }

    async getVideos(count) {
        try {
            const cachedVideos = await redisService.getValue("videos");
            if (cachedVideos) {
                return cachedVideos;
            }

            const channelId = await this.#getChannelIdByName(this.#channelName);
            if (!channelId) {
                return null;
            }
            const channelLists = await this.#getChannelLists(channelId);
            if (!channelLists) {
                return null;
            }
            const playlistId = await this.#getplayListId(channelLists);
            if (!playlistId) {
                return null;
            }
            const playlist = await this.#getPlaylistResponse(this.#youtubeApi.playlistItems, playlistId, count);
            if (!playlist) {
                return null;
            }
            const videos = this.#parsePlayList(playlist.data);
            redisService.setValue("videos", videos);
            return videos || null;
        } catch(error) {
            console.log("cannot get videos -->", error);
            return null;
        }
    }
}




export default new VideoApiService();