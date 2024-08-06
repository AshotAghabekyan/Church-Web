import { Router } from "express";
import videoApiController from "../controller/controller.js"
const router = new Router();
export default router;

router.get("/", videoApiController.getVideosPageHTML.bind(videoApiController))
router.get('/:videoCount', videoApiController.getVideos.bind(videoApiController))


