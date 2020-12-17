// External dependencies
const jwt = require("jsonwebtoken");

// Internal dependencies
const { secret, expiresIn } = require("../config").jwtConfig;
const { User } = require("../db/models");

//-----------------------------------------

// 1. Send JWT Cookie
const setTokenCookie = (res, user) => {
  // create a token
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) },
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set token Cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

// 2. Restore the session user
const restoreUser = (req, res, next) => {
  const { token } = req.cookies; // Parse token from cookies

  return jwt.verify(token, secret, null, async(err, jwtPayload) => {
    if (err) {
      return next();
    };

    try {
      const {id} = jwtPayload.data;
      req.user = await User.scope("currentUser").findByPk(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    };

    if (!req.user) res.clearCookie("token");

    return next();
  })
};

// 3. authenticate the session user
const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 401;
    return next(err);
  },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };