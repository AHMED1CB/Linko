import {
  loginSchema,
  registerSchema,
  updateSchema,
} from "../Validations/Auth.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthController {
  static async Register(req, res) {
    const { error } = registerSchema.validate(req.body);

    if (error || !req.body) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid Register Data",
        error: error.details
          ? error.details[0].message
          : "Invalid Data Or User Already Registerd",
      });
    } else {
      const data = {
        username: req.body.username,
        name: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
        bio: null,
        photo: null,
      };

      // Check if User Exists

      const checkUser = await User.exists({
        username: data.username,
        $or: [{ email: data.email }],
      });

      if (checkUser) {
        return res.status(400).json({
          status: "Fail",
          message: "User Has Already been Registerd",
          error: "User Has Already been Registerd",
        });
      }

      // Insert User Details
      const newUser = new User(data);
      await newUser.save();

      return res.status(200).json({
        status: "Success",
        message: "User Registerd Successfully",
        error: null,
      });
    }
  }

  static async Login(req, res) {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };

    const { error } = loginSchema.validate(data);

    if (error) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid Loign Data",
        error: error.details[0].message,
      });
    }

    const targetUser = await User.findOne({
      username: data.username,
    });

    if (!targetUser) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid Loign Data",
        error: "Invalid Loign Data",
      });
    }

    let verfied = await bcrypt.compare(data.password, targetUser.password);

    if (!verfied) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid Loign Data",
        error: "Invalid Loign Data",
      });
    }
    const payload = { id: targetUser.id, username: targetUser.username };

    const token = jwt.sign(payload, process.env.APP_SECRET);
    return res.status(200).json({
      message: "User Logged In Successfully",
      status: "Success",
      error: null,
      data: {
        token: token,
      },
    });
  }

  static async GetProfile(req, res) {
    return res.status(200).json({
      message: "",
      error: "",
      status: "Success",
      data: {
        user: await User.findOne({ _id: req.user.id }, { password: 0 }),
      },
    });
  }

  static async UpdateProfile(req, res) {
    const userId = req.user.id;

    const { error } = updateSchema.validate(req.body);
    if (error || !req.body) {
      return res.status(400).json({
        message: "Invalid Profile Data",
        error: error ? error.details[0].message : "Cannot Find Data To Update",
        status: "Fail",
      });
    }

    const toUpdate = ["username", "name", "bio"];
    const data = {};

    toUpdate.forEach((item) => {
      if (req.body[item]) {
        data[item] = req.body[item];
      }
    });

    if (req["file"]) {
      data["photo"] = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
      select: "-password",
    });

    return res.status(200).json({
      status: "Success",
      message: "User Details Updeted Successfully",
      error: null,
      data: {
        user: updatedUser,
      },
    });
  }
}
