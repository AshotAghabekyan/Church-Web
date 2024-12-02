import {FetchVideoService} from "../service/videoService.js";
import path from "path";


class VideoApiController {
    #videoService;

    constructor() {
        this.#videoService = new FetchVideoService();
    }

    async getVideos(req, res) {
        try {
            const videoCount = req.params.videoCount;
            const videos = await this.#videoService.getVideos(videoCount);
            if (!videos) {
                return res.status(404).json({message: "vidoes not found"});
            }
            return res.status(200).json(videos)
        } catch(error) {
            console.log("cannot send vidoes, error -->", error);
            return res.status(500).json({message: "server internal error"});
        }
    }


    async getVideoById(req, res) {
        try {
            const id = req.params.id;
            const videos = await this.#videoService.getVideos(4);
            const targetVideo = videos.find((video) => video.snippet.resourceId.videoId == id);
            res.status(200).json({video: targetVideo});
        }
        catch(error) {
            console.error(error);
            res.status(500).json({message: 'server internal error'})
        }
    }


    mainPage(req, res) {
        try {
            return res.sendFile(path.resolve("public/pages/videos/videos.html"));
        } catch(error) {
            console.log("cannot send html file -->", error);
            return res.status(500).json({message: "server internal error"});
        }
    }


    pageById(req, res) {
        try {
            return res.sendFile(path.resolve("public/pages/video/video.html"));
        }
        catch(error) {
            console.log("cannot send html file -->", error);
            return res.status(500).json({message: "server internal error"});
        }
    }
}


export {VideoApiController} 