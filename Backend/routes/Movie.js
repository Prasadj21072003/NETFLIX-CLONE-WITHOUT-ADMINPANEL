const router = require("express").Router();
const Movie = require("../models/Movie");

const verify = require("../verifytoken");

//create
router.post("/createmovie", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newmovie = new Movie(req.body);

    try {
      const savedmovie = await newmovie.save();
      return res.json(savedmovie);
    } catch (error) {
      console.log(`the  movie error is:${error}`);
    }
  } else {
    console.log("isAdmin is false ");
  }
});

//update
router.put("/:id", verify, async (req, res) => {
  console.log(req.user.isAdmin);
  if (req.user.isAdmin) {
    try {
      const updatemovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.json(updatemovie);
    } catch (err) {
      console.log(`the movie err is ${err}`);
    }
  } else {
    console.log("you are not allowed to update");
  }
});

//delete
router.delete("/:id", verify, async (req, res) => {
  console.log(req.user.isAdmin);
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.json("deleting");
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("you are not allowed to delete");
  }
});

//get
router.get("/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    //console.log(movie);
    return res.json(movie);
  } catch (err) {
    console.error(`The movieid err is ${err}`);
  }
});

//get all
router.get("///", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();

      res.json(movies);
    } catch (err) {
      console.log(`the allmovie err is ${err}`);
    }
  }
});

//get
router.get("/", async (req, res) => {
  const typequery = req.query.type;

  console.log(typequery);
  let movie;

  if (typequery === "Movie") {
    movie = await Movie.aggregate([
      { $sample: { size: 5 } },
      { $match: { isseries: false } },
    ]);
    return res.json(movie);
  } else {
    try {
      movie = await Movie.aggregate([
        { $sample: { size: 5 } },
        { $match: { isseries: true } },
      ]);
      return res.json(movie);
    } catch (err) {
      console.log(`the movietype err is ${err}`);
    }
  }
});

module.exports = router;
