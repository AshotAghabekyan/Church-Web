import { Request, Response } from "express";
import { VideoContentProvider } from "./videoContentProvider";
import { VideoInteractionService } from "./videoInteractionService";
import path from "path";



export class VideoRestApiController {
    private readonly videoContentProvider: VideoContentProvider;
    constructor() {
        this.videoContentProvider = new VideoContentProvider();
    }

    public async getVideos(req: Request, res: Response) {
        try {
            const videoCount: number = +req.params.videoCount;
            const videos: any = await this.videoContentProvider.getVideos(videoCount);
            if (!videos) {
                res.status(404).json({message: "vidoes not found"});
                return;
            }
            res.status(200).json(videos)
        } catch(error) {
            console.log("cannot send vidoes, error -->", error);
            res.status(500).json({message: "server internal error"});
        }
    }


    public async getVideoById(req: Request, res: Response) {
        try {
            const id: number = +req.params.id;
            const videos = await this.videoContentProvider.getVideos(4);
            const targetVideo = videos.find((video: any) => video.snippet.resourceId.videoId == id);
            res.status(200).json({video: targetVideo});
        }
        catch(error) {
            console.error(error);
            res.status(500).json({message: 'server internal error'})
        }
    }
}




export class VideoViewController {


    public allVideosPage(req: Request, res: Response) {
        try {
            res.sendFile(path.resolve("public/pages/videos/videos.html"));
        } catch(error) {
            console.error("cannot send html file -->", error);
            res.status(500).json({message: "server internal error"});
        }
    }


    public videoByIdPage(req: Request, res: Response) {
        try {
            res.sendFile(path.resolve("public/pages/video/video.html"));
        }
        catch(error) {
            console.error("cannot send html file -->", error);
            res.status(500).json({message: "server internal error"});
        }
    }

}





export class VideoInteractionController {
    private interactionProvider: VideoInteractionService;

    public likeVideo() {

    }
}