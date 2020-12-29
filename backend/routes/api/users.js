// External dependencies
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

// Internal dependencies
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { sequelize } = require("../../db/models");
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
  // const ids = await Track.findAll({
  //   attributes: [
  //     [sequelize.fn('COUNT', sequelize.col('userId')), "count"],
  //   ],
  //   order: [["count", "DESC"]]
  // })

  // const data = await User.findAll({
  //   attributes: ["User.*", [sequelize.fn("COUNT", "Track.id"), "trackCount"]],
  //   include: [{ model: Track, require: true} ],
  //   group: ["User.id", "Track.id"]
  // })

  const data = await sequelize.query('SELECT "Users".id, COUNT("Tracks".id) FROM "Users" JOIN "Tracks" on "Users".id = "Tracks"."userId" GROUP BY "Users".id ORDER BY COUNT DESC LIMIT 5' );

  // console.log(ids);

  res.json( data[0] );
}))

module.exports = router;