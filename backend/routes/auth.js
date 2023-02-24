const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

router.post(
  "/createuser",
  body("name", "minimum 3 char").isLength({ min: 3 }),
  body("email", "must be a email").isEmail(),
  body("password", "min a password").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    //checks the email is unique
    try {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "The Email is already exist" });
      }
      //make the password hash
      let salt = await bcrypt.genSalt(10);
      let passhash = await bcrypt.hash(req.body.password, salt);
      user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: passhash,
      });
      const JWT_SECRET = "hacker$123";
      const data = {
        user: {
          id: Users.id,
        },
      };
      const auth_token = jwt.sign(data, JWT_SECRET);
      res.json({success:true, authtoken: auth_token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);
//login authintacation for user
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "password can not be blank").exists(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    //checks the email is unique
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({
            success: false,
            error: "please try again with correct credentials",
          });
      }
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success: false,
            error: "please try again with correct credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const JWT_SECRET = "hacker$123";
      const auth_token = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, Authtoken: auth_token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some Error Occured");
    }
  }
);
//get login User Detailes
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some Error Occured");
  }
});
module.exports = router;
