import videoService from "../service/videoService.js";
import path from "path";

class VideoApiController {
    #videoService;

    constructor(videoService) {
        this.#videoService = videoService;
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

    getVideosPageHTML(req, res) {
        try {
            return res.sendFile(path.resolve("views/videos.html"));
        } catch(error) {
            console.log("cannot send html file -->", error);
            return res.status(500).json({message: "server internal error"});
        }
    }
}


export default new VideoApiController(videoService)