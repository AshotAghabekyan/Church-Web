import { Router } from "express";
import { google } from "googleapis";
import path from "path";
import videoService from "./service.js";

const router = new Router();
export default router;

const apiKey = process.env.apiKey;
const channelName = process.env.channelName;


router.get("/", function(request, response) {
    response.sendFile(path.resolve("views/videos.html"));
})


router.get('/allVideos', async (request, response) => {
  try {
    const videos = await videoService.getVideos(5);
    response.status(200).json(videos);
  } 

  catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


