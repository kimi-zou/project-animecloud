const express = require("express");
const path = require("path");
const multer = require("multer");
const uuid = require("uuid").v4;
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const { Track } = require("../../db/models");

//-------------- Save file to folder ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "trackFile") cb(null, "uploads/tracks");
    if (file.fieldname === "trackCover") cb(null, "uploads/covers");
  },
  filename: (req, file, cb) => {
    // const { originalname } = file;
    const ext = path.extname(file.originalname);
    const id = uuid();
    
    if (file.fieldname === "trackFile") {
      const filePath = `${id}${ext}`;
      req.body.trackPath = filePath;
      cb(null, filePath);
    }
    if (file.fieldname === "trackCover") {
      const filePath = `${id}${ext}`;
      req.body.coverImg = filePath;
      cb(null, filePath);
    }
    // cb(null, `${uuid()}-${originalname}`);
  }
})
const upload = multer({ 
  storage, 
  limits: { fileSize:'10mb' },  
});

const trackUpload = upload.fields([
  { name: "trackFile", maxCount: 1},
  { name: "trackCover", maxCount: 1}
])

//-------------- Routes ----------------
// 1. Create Track
router.post("/create", requireAuth, trackUpload, asyncHandler(async(req, res, next) => {
  const { trackTitle, trackDescription, trackPath, coverImg } = req.body;
  console.log(trackPath);
  console.log(coverImg);

  const track = Track.build({
    title: trackTitle,
    description: trackDescription,
    coverImg,
    trackPath,
    userId: req.user.id,
  })

  await track.save();

  return res.json({ track });
}))

// 2. Read Tracks
router.get("/", requireAuth, asyncHandler(async(req, res, next) => {
  const tracks = await Track.findAll({
    where: {userId: req.user.id}
  })

  // console.log(tracks[0].dataValues); 

  if (tracks) {
    return res.json({ tracks });
  } else {
    return res.json({ });
  }
}))

module.exports = router;