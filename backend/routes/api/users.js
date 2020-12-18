// External dependencies
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// Internal dependencies
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

// Sign up
router.post("/", asyncHandler(async(req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, password, username });

  await setTokenCookie(res, user);

  return res.json({ user });
}));

module.exports = router;