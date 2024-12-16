import { Request, Response } from "express";
import { VideoContentProvider } from "./videoContentProvider";
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
                res.status(404).render("notFound", {message: 'vidoes not found'});
                return;
            }
            return res.status(200).render(path.resolve('public/pages/videos/videos.hbs'), {videos});

        } catch(error) {
            console.log("cannot send vidoes, error -->", error);
            res.status(500).render("internalError", {message: "server internal error"});
        }
    }


    public async getVideoById(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const videos = await this.videoContentProvider.getVideos(4);
            const targetVideo = videos.find((video: any) => video.snippet.resourceId.videoId == id);
            const recommended = videos.filter((video: any) => video.snippet.resourceId.videoId != id);
            return res.status(200).render(path.resolve('public/pages/video/video.hbs'), {
                targetVideo, 
                recommended,
                videoId: targetVideo.snippet.resourceId.videoId,
            })
        }
        catch(error) {
            console.error(error);
            res.status(500).render('internalError', {error})
        }
    }
}






