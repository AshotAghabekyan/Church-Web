import { Router } from "express";
import { google } from "googleapis";
import path from "path";

const router = new Router();
export default router;

const apiKey = process.env.apiKey;
const channelName = process.env.channelName;


async function getChannelIdByName(apiKey, channelName) {
    const youtube = google.youtube({
      version: 'v3',
      auth: apiKey,
    });
  
    let allChannelsByName = await youtube.search.list({
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

async function getPlaylistResponse(playlistItems, playlistId) {
  let playlist = await playlistItems.list({
      part: "snippet",
      playlistId: playlistId,
      maxResults: 5, 
  });
  return playlist
}


function getLastestFiveVideos(playListResponseData) {
  let videos = playListResponseData.items.map(item => {
    item.snippet.videoLink = `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
    return item;
  });
  return videos;
}


router.get("/", function(request, response) {
    response.sendFile(path.resolve("views/videos.html"));
})


router.get('/allVideos', async (request, response) => {
  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: apiKey,
    });

    const channelId = await getChannelIdByName(apiKey, channelName); 

    let channelLists = await youtube.channels.list({
      part: 'contentDetails',
      id: channelId,
    });

    const playlistId = channelLists.data.items[0].contentDetails.relatedPlaylists.uploads;

    const playlistResponse = await getPlaylistResponse(youtube.playlistItems, playlistId);
    const lastFiveVideos = await getLastestFiveVideos(playlistResponse.data);
    response.status(200).json(lastFiveVideos);
  } 

  catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


