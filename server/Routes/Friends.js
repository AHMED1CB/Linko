import { Router } from "express";
import FriendsController from "../Controllers/FriendsController.js";

const router = Router();

router.get('/' , FriendsController.GetUserFriends)

export default router;