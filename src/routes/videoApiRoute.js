import { Router } from "express";
import {VideoApiController} from "../controller/videoController.js";


const router = new Router();
const videoApiController = new VideoApiController();
export default router;

router.get("/", videoApiController.mainPage.bind(videoApiController))
router.get("/id/:id", videoApiController.pageById.bind(videoApiController));
router.get("/id/:id/metadata", videoApiController.getVideoById.bind(videoApiController));
router.get('/:videoCount', videoApiController.getVideos.bind(videoApiController))
// router.post('/:id/like', )
