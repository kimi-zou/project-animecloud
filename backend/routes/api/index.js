// External dependencies
const router = require("express").Router();
const asyncHandler = require("express-async-handler");

// Internal dependencies
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const sessionRouter = require("./session");
const userRouter = require("./users");

//-------------- Testing routes ----------------
// API test route: server setup
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// API test route: setTokenCookie 
router.get("/set-token-cookie", asyncHandler(async(req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    },
  })
  setTokenCookie(res, user);
  return res.json({ user });
}))

// API test route: restoreUser
router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

// API test route: requireAuth
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

//-------------- API routes ----------------
router.use("/session", sessionRouter);
router.use("/users", userRouter);

module.exports = router;