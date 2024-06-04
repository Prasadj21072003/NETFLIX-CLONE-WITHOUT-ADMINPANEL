const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register

router.post("/register", async (req, res) => {
  const newuser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const user = await newuser.save();
    res.json(user);
  } catch (error) {
    console.log(`the error is:${error}`);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && console.log("wrong email");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalpass = bytes.toString(CryptoJS.enc.Utf8);

    originalpass !== req.body.password && console.log("wrong password");

    const acesstoken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    console.log(acesstoken);

    const { password, ...info } = user._doc;

    res.json({ ...info, acesstoken });

    try {
      /*   return res.cookie("jwttoken", acesstoken, {
        maxAge: 432000000,
        httpOnly: true,
      }); */
    } catch (err) {
      console.log(`the error is ${err}`);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
