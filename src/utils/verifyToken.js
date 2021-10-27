const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    //Verifica el token, si este coincide entonces next
    jwt.verify(token, process.env.SECRET_WORD, (error, user) => {
      if (error) res.status(401).json("Invalid Token");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

module.exports = verify;
