import { Router } from "express";

import AuthController from "../Controllers/AuthController.js";
import authToken from "../Middleware/Auth.js";
import { uploadPhoto } from "../Configs/Storage.js";

const router = Router();

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);

router.get("/profile", authToken, AuthController.GetProfile);

router.put("/profile/update", uploadPhoto.single('photo') ,  authToken, AuthController.UpdateProfile);


export default router;
