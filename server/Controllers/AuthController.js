import {
  loginSchema,
  registerSchema,
  updateSchema,
} from "../Validations/Auth.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Friend from "../Models/Friend.js";
import Request from "../Models/Request.js";


export default class AuthController {
  static async Register(req, res) {

    // Check if User Exists First

    const data = {
      username: req.body.username,
      name: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8),
      bio: null,
      photo: null,
    };


    const checkUser = await User.exists({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (checkUser) {
      return res.status(400).json({
        status: "Fail",
        message: "User Has Already been Registerd",
        error: "User Has Already been Registerd",
      });
    }

    const { error } = registerSchema.validate(req.body);

    if (error || !req.body) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid Register Data",
        error: error.details
          ? error.details[0].message
          : "Invalid Data Or User Already Registerd",
      });
    }



    // Insert User Details
    await User.create(data);

    return res.status(200).json({
      status: "Success",
      message: "User Registerd Successfully",
      error: null,
    });
  }

  static async Login(req, res) {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };

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

    const { error } = loginSchema.validate(data);

    if (error) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid Loign Data",
        error: error.details[0].message,
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

    const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '2d' });

    return res.status(200).json({
      message: "User Login Successfully",
      status: "Success",
      error: null,
      data: {
        token: token,
      },
    });
  }

  static async GetProfile(req, res) {

    let userProfile = await User.findById(req.user.id).select('-password');
    userProfile = userProfile.toObject();


    // Send Requests And Friends List

    const userHasFriends = await Friend.exists({ user: userProfile._id });

    const [friendsDoc, requests] = await Promise.all([
      userHasFriends ?
        Friend.find({ user: userProfile._id }).select('friends -_id').populate({
          path: 'friends',
          model: User,
          select: '-password'
        }) : [],

      await Request.find({ to: userProfile._id }).populate({
        path: 'from',
        model: User,
        select: '-password'
      })
    ]);

    userProfile.friends = friendsDoc.friends
    userProfile.requests = requests


    return res.status(200).json({
      message: "",
      error: "",
      status: "Success",
      data: {
        user: userProfile,
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
    if (req.body.username) {
      let userByUserName = await User.findOne({username:req.body.username});
      
      if (userByUserName  && userByUserName._id != req.user.id) {
        return res.status(409).json({
          status: "Fail",
          message: "Invalid Profile Data",
          error: "Username Already Used",
          data: null
        });

      }
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
