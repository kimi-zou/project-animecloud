const express = require("express");
const path = require("path");
const multer = require("multer");
const uuid = require("uuid").v4;
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { trackMulterUpload, s3Upload } = require("../../awsS3");
const { requireAuth } = require("../../utils/auth");
const { Track, User } = require("../../db/models");

//-------------- Routes ----------------
// 1. Create Track
router.post("/create", requireAuth, trackMulterUpload, asyncHandler(async(req, res, next) => {
  const { trackTitle, trackDescription } = req.body;
  const trackPath = await s3Upload(req.files["trackFile"][0], "tracks");
  const coverImg = await s3Upload(req.files["trackCover"][0], "covers");

  const track = await Track.create({
    title: trackTitle,
    description: trackDescription,
    coverImg,
    trackPath,
    userId: req.user.id,
  })

  return res.json({ track });
}))

// 2. Get track by trackId (along with user info)
router.get("/:id", asyncHandler(async(req, res, next) => {
  const id = req.params.id;
  const track = await Track.findAll({
    where: {id: id},
    include: User
  });
  if (track) {
    return res.json({ track });
  } else {
    return res.json({ });
  };
}))

// 3. Get recent released tracks
router.get("/list/newest", asyncHandler(async(req, res, next) => {
  const tracks = await Track.findAll({
    include: User,
    order: [["createdAt", "DESC"]],
    limit: 5
  })
  res.json({tracks});
}))



module.exports = router;