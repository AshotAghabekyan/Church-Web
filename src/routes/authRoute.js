import {Router} from "express";
import { AuthController } from "../controller/authController.js";

const router = Router();
export default router;
const authController = new AuthController();


router.get("/", authController.authenticate.bind(authController))
router.get("/callback", authController.authCallback.bind(authController))


