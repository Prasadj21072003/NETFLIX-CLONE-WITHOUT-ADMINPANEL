const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authtoken = req.headers.token;

  try {
    if (authtoken) {
      const token = authtoken.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          console.log("Token is not valid");
        }
        req.user = user;
        next();
      });
    }
  } catch (err) {
    console.log(`you are not authenticated ${err}`);
  }
}

module.exports = verify;
