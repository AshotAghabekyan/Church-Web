import { Router } from "express";
import { AdminAuthController } from "../controller/adminAuthController.js";

const authController = new AdminAuthController();
const router = Router();
export default router;


router.get("/", authController.index.bind(authController));
router.post("/", authController.authorization.bind(authController));