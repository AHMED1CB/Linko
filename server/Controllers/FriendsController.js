import Friend from "../Models/Friend.js";

export default class FriendsController {

    static async GetUserFriends(req, res) {
        const userId = req.user.id;

        const friends = await Friend.findOne({ user: userId }).populate({
            path: "friends",
            select: "-password"
        });

        return res.status(200).json({
            message: "",
            error: "",
            data: {
                friends : friends.friends
            }
        })
    }

    static async DeleteFriend(req, res) {

        const { friendId: targetFriendId } = req.params;

        const currentId = req.user.id;

        const userFriends = await Friend.findOne({ user: currentId }) ?? [];

        const isFriend = userFriends.friends.some((id) => {
            return (id.toString() === targetFriendId)
        })

        if (!isFriend || targetFriendId == currentId) {
            return res.status(400).json({
                message: "Invalid Friend Id",
                error: "Cannot Find Friend With this Id",
                status: "Fail"
            });
        }


        // Delete from freinds List

        await Friend.updateOne({ user: currentId }, {
            $pull: {
                friends: targetFriendId
            }
        })


        await Friend.updateOne({ user: targetFriendId }, {
            $pull: {
                friends: currentId
            }
        })

        return res.status(200).json({
            message: "Friend Deleted Successfully",
            error: null,
            status: "Success"
        });

    }

}