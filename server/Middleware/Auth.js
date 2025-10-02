import jwt from "jsonwebtoken";

export default function authToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      status: "Fail",
      message: "Invalid Token",
      error: "Invalid Token",
    });
  }

  jwt.verify(token, process.env.APP_SECRET, (e, user) => {
    if (e) {
      return res.status(401).json({
        status: "Fail",
        message: "Invalid Token",
        error: "Invalid Token",
      });
    }

    req.user = user;
    next();
  });
}
