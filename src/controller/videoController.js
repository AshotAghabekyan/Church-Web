import VideoService from "../service/videoService.js";
import path from "path";



class VideoApiController {
    #videoService;

    constructor(videoService) {
        this.#videoService = new VideoService();
    }


    async homePage(req, res) {
        try {
            let videoCount = req.query.count;
            if (!videoCount) {
                return res.sendFile(path.resolve("views/videos.html"));
            }
        
            let videos = await this.#videoService.getVideoByCount(videoCount);
            return res.status(200).json({ videoes: videos });
        }
        catch(error) {
            res.status(500).json({message: 'server internal error'});
            console.log("video api controller error -->", error);
        }
    }


    async allVideos(req, res)  {
        try {
            let allVideos = await this.#videoService.getAllVideos();
            return res.status(200).json({"videos": allVideos});
        }
        catch(error) {
            res.status(500).json({message: "server internal error"});
            console.log("video api controller error -->", error);
        }
    }

    async getVideoById(req, res) {
        try {
            let targetVideoId = req.params.id;
            let targetVideo = await this.#videoService.getVideoById(targetVideoId);
            return res.status(200).json({video: targetVideo});
        }
        catch(error) {
            res.status(500).json({message: "server internal error"});
            console.log("video api controller error -->", error);
        }
    }


    async createVideo(req, res) {
        try {
            let videoMetadata = req.body;
            let newVideo = await this.#videoService.createVideo(videoMetadata);
            return res.status(201).json({ video: newVideo });
        }
        catch(error) {
            console.log("video api controller error -->", error);
            res.status(500).json({message: 'server internal error'});
        }
    }

    async deleteVideo(req, res)  {
        try {
            let deleteVideoId = req.params.id;
            let result = await this.#videoService.deleteRecordById(deleteVideoId);
            return res.status(200).json({result});
        }
        catch(error) {
            res.status(500).json({message : 'server internal error'});
            console.log("video api controller error -->", error);
        }
    }
}


export default new VideoApiController()