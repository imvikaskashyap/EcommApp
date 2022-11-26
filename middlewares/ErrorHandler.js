const path = require("path");
//const dirName = path.join(__dirname,'./')

const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
  res.sendFile(path.join(__dirname + "./../views/error.html"));
};

module.exports = ErrorHandler;
