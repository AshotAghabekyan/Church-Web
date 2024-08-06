import { Router } from "express";
import authController from "../controller/authController.js";
const router = new Router();
export default router;

router.post("/", authController.adminAuth.bind(authController));
