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
