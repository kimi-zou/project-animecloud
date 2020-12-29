const express = require("express");
const path = require("path");
const multer = require("multer");
const uuid = require("uuid").v4;
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { trackMulterUpload, s3Upload } = require("../../awsS3");
const { requireAuth } = require("../../utils/auth");
const { Track } = require("../../db/models");

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

// 2. Read Tracks
router.get("/", requireAuth, asyncHandler(async(req, res, next) => {
  const tracks = await Track.findAll({
    where: {userId: req.user.id}
  })

  if (tracks) {
    return res.json({ tracks });
  } else {
    return res.json({ });
  }
}))

module.exports = router;