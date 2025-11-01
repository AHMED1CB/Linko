import { Router } from "express";
import FriendsController from "../Controllers/FriendsController.js";

const router = Router();

// router.get('/', FriendsController.GetUserFriends)
router.get('/:friendId', FriendsController.getFriendDetails)

router.delete('/:friendId', FriendsController.DeleteFriend)



export default router;