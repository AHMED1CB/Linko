import Friend from "../Models/Friend.js";

export default class FriendsController {

    static async GetUserFriends(req, res) {
        const userId = req.user.id;


        const friends = await Friend.findOne({ user: userId }).populate({
            path: 'friends',
            select: '-password'
        });



        return res.status(200).json({
            message: "",
            error: '',
            data: {
                friends
            }
        })
    }

    static async DeleteFriend(req, res) {

        const { friendId: targetFriendId } = req.params;
        const currentId = req.user.id;

        const userFriends = await Friend.findOne({ user: currentId });

        if (targetFriendId == currentId) {
            return res.status(400).json({
                message: 'Cannot Remove Yourself From Friends List',
                error: 'Invalid Friend Id',
                status: "Fail"
            });
        }

        const userHasFriendsList = await Friend.exists({ user: currentId });

        if (!userHasFriendsList) {
            return res.status(400).json({
                message: 'You Dont Have Friends List',
                error: 'Invalid Friends List',
                status: "Fail"
            });
        }


        const isFriend = userFriends.friends.some((id) => {
            return (id.toString() === targetFriendId)
        })

        if (!isFriend) {
            return res.status(400).json({
                message: 'This Friend Id is Not in Your Friends List',
                error: 'Cannot Find Friend With this id',
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
            message: 'Friend Deleted Successfully',
            error: null,
            status: "Success"
        });

    }

}