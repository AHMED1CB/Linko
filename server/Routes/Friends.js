import { Router } from "express";
import FriendsController from "../Controllers/FriendsController.js";

const router = Router();

// router.get('/', FriendsController.GetUserFriends)

router.get('/:friendId', FriendsController.getFriendDetails)

router.delete('/:friendId', FriendsController.DeleteFriend)

router.get('/search/:username', FriendsController.searchByUserName) // this search for normal users to add new freinds not search in friends list


export default router;