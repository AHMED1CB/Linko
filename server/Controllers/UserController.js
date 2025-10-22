import Friend from "../Models/Friend.js";
import Message from "../Models/Message.js";
import Request from "../Models/Request.js";
import User from "../Models/User.js";

export default class UserController {
  static async getDetails(req, res) {
    const { username } = req.params;

    let targetUser = await User.findOne({ username }).select("-password");

    if (!targetUser) {
      return res.status(400).json({
        status: "Fail",
        message: "Cannot Find User With this username",
        error: "Cannot Find User With this username",
      });
    }

    targetUser = targetUser.toObject();

    const [isRequested, isFriend] = await Promise.all([
      Request.exists({ from: req.user.id, to: targetUser._id }),
      Friend.exists({
        user: req.user.id,
        "friends": targetUser._id
      })]);

    // get Messages;

    targetUser.isRequested = Boolean(isRequested)
    targetUser.isFriend = Boolean(isFriend)





    return res.status(200).json({
      status: "Success",
      message: "User Found",
      error: null,
      data: {
        user: targetUser,
      },
    });
  }
}
