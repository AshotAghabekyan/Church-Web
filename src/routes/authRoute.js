import { Router } from "express";
import { AuthController } from "../controller/authController.js";

const authController = new AuthController();
const router = Router();
export default router;


router.get("/", authController.index.bind(authController));
router.post("/", authController.authorization.bind(authController));