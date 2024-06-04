const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifytoken");

//Create
router.post("/createuser", verify, async (req, res) => {
  if (req.user.isAdmin) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
    const newuser = new User(req.body);
    try {
      const saveduser = await newuser.save();
      res.json(saveduser);
    } catch (error) {
      console.log(`the error is:${error}`);
    }
  } else {
    res.json("isAdmin is false ");
  }
});

//update
router.put("/:id", verify, async (req, res) => {
  console.log(req.user.isAdmin);

  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updateuser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updateuser);
    } catch (err) {
      res.json(`the err is ${err}`);
    }
  } else {
    res.json("you are not allowed to update");
  }
});

//delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json("deleting");
    } catch (err) {
      res.json(`the err is ${err}`);
    }
  } else {
    res.json("you are not allowed to delete");
  }
});

//get
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.json(info);
  } catch (err) {
    res.json(`the err is ${err}`);
  }
});

//get all
router.get("/", verify, async (req, res) => {
  console.log(req.user.isAdmin);
  if (req.user.isAdmin) {
    const query = req.query.new;

    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.json(users);
    } catch (err) {
      console.log(`the err is ${err}`);
    }
  } else {
    console.log("isAdmin is false");
  }
});

//get user stats

module.exports = router;
