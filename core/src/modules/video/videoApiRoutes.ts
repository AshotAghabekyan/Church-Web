
import { Router } from "express";
import { VideoRestApiController } from "./videoController.ts";

const router: Router = Router();
const restApiController: VideoRestApiController = new VideoRestApiController();
export default router;

router.get("/id/:id/", restApiController.getVideoById.bind(restApiController));
router.get('/:videoCount', restApiController.getVideos.bind(restApiController));
