import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import authToken from "../Middleware/Auth.js";

const router = Router();

router.get("/:username", authToken ,  UserController.getDetails);

export default router;
