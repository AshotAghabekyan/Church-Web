import videoApiController from "../controller/videoController.js"
import authController from "../controller/authController.js";
import { Router } from "express";


const router = new Router();
export default router;

router.get("/", videoApiController.homePage.bind(videoApiController));

router.post("/", authController.isAuthorized.bind(authController),
                videoApiController.createVideo.bind(videoApiController));

router.get("/allVideos", videoApiController.allVideos.bind(videoApiController));
router.get("/:id", videoApiController.getVideoById.bind(videoApiController));

router.delete("/:id", authController.isAuthorized.bind(authController),
                        videoApiController.deleteVideo.bind(videoApiController)
                );





