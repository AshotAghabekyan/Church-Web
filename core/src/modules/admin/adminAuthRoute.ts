import { Router } from "express";
import { AdminAuthController } from "./adminAuthController.ts";

const authController: AdminAuthController = new AdminAuthController();
const router = Router();
export default router;


router.get("/", authController.adminAuthPage.bind(authController));
router.post("/", authController.authorization.bind(authController));