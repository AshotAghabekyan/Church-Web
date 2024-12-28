// deno-lint-ignore-file
import { Request, Response, NextFunction } from "express";
import { VideoContentProvider } from "./videoContentProvider.ts";
import path from "node:path";
import { InternalErrorException, NotFoundException } from "../exceptionFilter/httpExceptions.ts";



export class VideoRestApiController {
    private readonly videoContentProvider: VideoContentProvider;
    constructor() {
        this.videoContentProvider = new VideoContentProvider();
    }

    public async getVideos(req: Request, res: Response, next: NextFunction) {
        try {
            const videoCount: number = +req.params.videoCount;
            const videos: any = await this.videoContentProvider.getVideos(videoCount);
            if (! videos.length) {
                throw new NotFoundException('The Requested Videos Not Found')
            }

            return res.status(200).render(path.resolve('public/pages/videos/videos.hbs'), {videos});

        } catch(error) {
            console.log("cannot send vidoes, error -->", error);
            next(error)
        }
    }


    public async getVideoById(req: Request, res: Response, next: NextFunction) {
        try {
            const id: string = req.params.id;
            const videos = await this.videoContentProvider.getVideos(4);
            const targetVideo = videos.find((video: any) => video.snippet.resourceId.videoId == id);
            if (!targetVideo) {
                throw new NotFoundException('The Requested Video Not Found')
            }

            const recommended = videos.filter((video: any) => video.snippet.resourceId.videoId != id);

            return res.status(200).render(path.resolve('public/pages/video/video.hbs'), {
                targetVideo, 
                recommended,
                videoId: targetVideo.snippet.resourceId.videoId,
            })
        }
        catch(error) {
            next(error);
        }
    }

}






