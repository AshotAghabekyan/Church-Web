
import { Router } from "express";
import { VideoInteractionController, VideoRestApiController, VideoViewController } from "./videoController.ts";

const router: Router = Router();
const restApiController: VideoRestApiController = new VideoRestApiController();
const interactionController: VideoInteractionController = new VideoInteractionController();
const viewController: VideoViewController = new VideoViewController();
export default router;

router.get("/", viewController.allVideosPage.bind(viewController));
router.get("/id/:id", viewController.videoByIdPage.bind(viewController));
router.get("/id/:id/metadata", restApiController.getVideoById.bind(restApiController));
router.get('/:videoCount', restApiController.getVideos.bind(restApiController));
router.post('id/:id/like', interactionController.likeVideo.bind(interactionController));
