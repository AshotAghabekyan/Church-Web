import { google } from "googleapis"


class VideoApiService {
    #apiKey = process.env.apiKey;
    #channelName = process.env.channelName;
    #youtubeApi;

    constructor(version, authKey) {
        this.#youtubeApi =  google.youtube({
            version: 'v3',
            auth: this.#apiKey,
        });
    }


    async getChannelIdByName(channelName) {
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
    }


    async getChannelLists(channelId) {
        let channelLists = await this.#youtubeApi.channels.list({
          part: 'contentDetails',
          id: channelId,
        });
        return channelLists;
    }


    async getplayListId(channelLists) {
        const playlistId = channelLists.data.items[0].contentDetails.relatedPlaylists.uploads;
        return playlistId;
    }


    async getPlaylistResponse(playlistItems, playlistId, videoCount) {
        let playlist = await playlistItems.list({
            part: "snippet",
            playlistId: playlistId,
            maxResults: videoCount, 
        });
        return playlist
    }


    parsePlayList(playListResponseData) {
        let videos = playListResponseData.items.map(item => {
          item.snippet.videoLink = `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
          return item;
        });
        return videos;
    }

    async getVideos(count) {
        const channelId = await this.getChannelIdByName(this.#channelName);
        const channelLists = await this.getChannelLists(channelId);
        const playlistId = await this.getplayListId(channelLists);
        const playlist = await this.getPlaylistResponse(this.#youtubeApi.playlistItems, playlistId, count);
        const videos = await this.parsePlayList(playlist.data);
        return videos;
    }
}




export default new VideoApiService();