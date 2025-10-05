import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const router = Router();

router.get("/:username", UserController.getDetails);

export default router;
