import { Router } from "express";

import AuthController from "../Controllers/AuthController.js";
import authToken from "../Middleware/Auth.js";

const router = Router();

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);

router.get("/profile", authToken, AuthController.GetProfile);

export default router;
