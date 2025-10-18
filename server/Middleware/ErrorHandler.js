export const errorHandler = (err, req, res, next) => {
  console.log(err)
  return res.status(500).json({
    message: "Something Went Wrong Try Again Later",
    status: "Fail",
    error: "Something Went Wrong Try Again Later",
  });
};
