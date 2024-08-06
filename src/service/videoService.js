import PostgreSqlVideoRepository from "../repository/VideoRepository.js";


class VideoService {
    #videoRepository;

    constructor() {
        this.#videoRepository = new PostgreSqlVideoRepository();
    }


    async getAllVideos() {
        try {
            const allVideos = await this.#videoRepository.getAllVideos();
            return allVideos || null;
        }
        catch(error) {
            console.log(error);
        }
    }

    async getVideoById(id) {
        try {
            const targetVideo = await this.#videoRepository.getVideoById(id);
            return targetVideo || null;
        }
        catch(error) {
            console.log(error);
        }
    }

    async getVideoByCount(count) {
        try {
            const videos = await this.#videoRepository.getVideosByCount(count);
            return videos || null;
        }
        catch(error) {
            console.log(error);
        }
    }


    async createVideo(videoMetadata) {
        try {
            const isCreated = await this.#videoRepository.createVideo(videoMetadata);
            return isCreated || false;
        }
        catch(error) {
            console.log(error);
        }
    }

    async deleteVideo(id) {
        try {
            const isDeleted = await this.#videoRepository.deleteVideoById(id);
            return isDeleted || false;
        }
        catch(error) {
            console.log(error);
        }
    }
}


export default VideoService