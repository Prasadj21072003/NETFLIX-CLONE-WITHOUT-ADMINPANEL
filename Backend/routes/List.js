const router = require("express").Router();
const List = require("../models/List");

const verify = require("../verifytoken");

//create
router.post("/createlist", verify, async (req, res) => {
  console.log(req.user.isAdmin);

  if (req.user.isAdmin) {
    const newlist = new List(req.body);

    try {
      const savedlist = await newlist.save();
      return res.json(savedlist);
    } catch (error) {
      console.log(`the list error is:${error}`);
    }
  } else {
    console.log("isAdmin is false ");
  }
});

//delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      return res.json("deleting");
    } catch (err) {
      console.log(`the list err is ${err}`);
    }
  } else {
    console.log("you are not allowed to delete");
  }
});

//update
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatemovielist = await List.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.json(updatemovielist);
    } catch (err) {
      console.log(`the list err is ${err}`);
    }
  } else {
    console.log("you are not allowed to update");
  }
});

//getbyid
router.get("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    return res.json(list);
  } catch (err) {
    console.log(`the list err is ${err}`);
  }
});

//get all
router.get("/", async (req, res) => {
  const typequery = req.query.type;
  const genrequery = req.query.genre;

  if (typequery) {
    console.log(typequery);
    if (genrequery) {
      if (genrequery === "Genre") {
        const list = await List.aggregate([
          //   { $sample: { size: 4 } },
          { $match: { type: typequery } },
        ]);

        return res.json(list);
      } else {
        const list = await List.aggregate([
          //   { $sample: { size: 4 } },
          { $match: { type: typequery, genre: genrequery } },
        ]);
        return res.json(list);
      }
    } else {
      const list = await List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type: typequery } },
      ]);

      return res.json(list);
    }
  } else {
    try {
      const list = await List.find();
      return res.json(list);
    } catch (err) {
      console.log(`the list err is ${err}`);
    }
  }
});

module.exports = router;
