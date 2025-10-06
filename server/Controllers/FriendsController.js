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


}