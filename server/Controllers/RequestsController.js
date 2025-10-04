import Request from "../Models/Request.js";
import User from "../Models/User.js";

export default class RequestController {
  static async Send(req, res) {
    const { userId: targetUser } = req.params;

    const currentUser = req.user.id;

    const checkUserExists = await User.exists({ _id: targetUser });

    if (!checkUserExists || currentUser === targetUser) {
      return res.status(400).json({
        message:
          currentUser === targetUser
            ? "You Cant Send Request To Yourself"
            : "Cannot Find User With This id",
        error: "Cannot Send Request",
        status: "Fail",
      });
    }

    const isAlreadySent = await Request.exists({
      from: currentUser,
      to: targetUser,
    });

    if (isAlreadySent) {
      return res.status(400).json({
        message: "Friend request already sent",
        error: "Friend request already sent",
        status: "Fail",
      });
    }

    const request = await Request.create({
      from: currentUser,
      to: targetUser,
    });

    if (!request) {
      return res.status(500).json({
        message: "Something Went Wrong While sending The Request",
        error: "Something Went Wrong",
        status: "Fail",
      });
    }

    return res.status(201).json({
      message: "Friend Request Sent",
      error: null,
      status: "Success",
    });
  }
}
