import Friend from "../Models/Friend.js";
import User from "../Models/User.js";
import Message from "../Models/Message.js";

export default class FriendsController {

    static async DeleteFriend(req, res) {

        const { friendId: targetFriendId } = req.params;

        const currentId = req.user.id;


        const isFriend = FriendsController.isFriend(req.body.id, targetFriendId);

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

    static async isFriend(userId, friendId) {

        const userFriends = await Friend.findOne({ user: userId }) ?? [];

        const isFriend = userFriends.friends.some((id) => {
            return (id.toString() === friendId)
        })

        return isFriend;
    }


    static async getFriendDetails(req, res) {


        const { friendId } = req.params;

        if (!FriendsController.isFriend(req.user.id, friendId) || friendId === req.user.id) {
            return res.status(400).json({
                message: "Invalid Friend Id",
                error: "Cannot Find Friend With this Id",
                status: "Fail"
            });
        }


        let friendData = await User.findById(friendId).select('-password');
        friendData = friendData.toObject();


        friendData.messages = await Message.find({
            $or: [{
                from: req.user.id,
                to: friendData._id
            }, {
                from: friendData._id,
                to: req.user.id
            }]
        }).sort({ createdAt: 1 })

        return res.status(200).json({
            status: "Succcess",
            message: "Friend Details Found Successfully",
            error: null,
            data: {
                friend: friendData
            }
        })
    }

}