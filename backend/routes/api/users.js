// External dependencies
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

// Internal dependencies
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Sequelize, sequelize } = require("../../db/models");
const { User, Track } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");

//-------------- Middlewares ----------------
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
]

// const getAllTracks = () => {}

//-------------- Routes ----------------
// 1. Sign up
router.post("/", validateSignup, asyncHandler(async(req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, password, username });

  await setTokenCookie(res, user);

  return res.json({ user });
}));

// 2. Get popular artists
router.get("/list/popular", asyncHandler(async(req, res, next) => {
  const data = await User.findAll({
    subQuery: false,
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col("Tracks.id")), "trackcount"]],
      
    },
    include: [{
      model: Track,
      attributes: []
    }],
    group: ["User.id"],
    order: [[Sequelize.literal('trackcount'), "DESC"]],
    limit: 5
  })
  const ids = data.map((user) => user.dataValues.id);
  const tracks = await Track.findAll({
    where: {
      userId: ids
    },
  })
  res.json({user: data, tracks: tracks});
}))

// 3. Get user by username along with all the tracks
router.get("/:username", asyncHandler(async(req, res, next) => {
  const username = req.params.username;
  const user = await User.findAll({
    where: {username: username},
    include: Track
  })

  if (user) {
    return res.json({ user });
  } else {
    return res.json({ });
  }
}))

module.exports = router;