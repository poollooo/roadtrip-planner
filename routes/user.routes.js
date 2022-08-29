const router = require("express").Router();
const { findOne } = require("../models/User.model");
const User = require("../models/User.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  const findAll = await User.find();
  res.json({ findAll });
});

router.patch("/:username", async (req, res, next) => {
  const updatedValue = {};
  if (!req.body.username && !req.body.email) {
    res.status(400).json({ message: "Nothing to change" });
    return;
  }
  //getting the user using the params
  const userToUpdate = await User.findOne(req.params);
  if (!userToUpdate) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  //if the username is filled, checking that it is correct
  if (req.body.username) {
    //checking if the user name is different than the actual one
    if (req.body.username === res.params.username) {
      return res
        .status(400)
        .json({ errorMessage: "This is already your username." });
    }
    const existingUser = await User.findOne({ username: req.body.username });
    // If the user is found, send the message username is taken
    if (existingUser) {
      return res.status(400).json({ errorMessage: "Username already taken." });
    }

    updatedValue.username = req.body.username;
  }
  //To be added
  // if(req.body.email){

  // }
  if (req.body.email) {
    //checking if the user name is different than the actual one
    if (req.body.email === userToUpdate.email) {
      return res
        .status(400)
        .json({ errorMessage: "This is already your email." });
    }
    const existingUser2 = await User.findOne({ email: req.body.email });
    // If the user is found, send the message username is taken
    if (existingUser2) {
      return res.status(400).json({ errorMessage: "Email already taken." });
    }
    if (req.body.email === userToUpdate.email) {
      return res
        .status(400)
        .json({ errorMessage: "This is already your email." });
    }
    updatedValue.email = req.body.email;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userToUpdate._id,
    updatedValue,
    {
      new: true,
    }
  );

  res.status(200).json({ message: "user updated", User: updatedUser });
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
