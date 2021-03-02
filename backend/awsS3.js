const AWS = require('aws-sdk');
const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');

const NAME_OF_BUCKET = 'animecloud';
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// --------------------------- Upload Track Form ------------------------
const storage = multer.memoryStorage();
const trackMulterUpload = multer({
  storage,
  limits: { fileSize: '10mb' }
}).fields([
  { name: 'trackFile', maxCount: 1 },
  { name: 'trackCover', maxCount: 1 }
]);

const s3Upload = async (trackFile, folder) => {
  const { originalname, buffer } = await trackFile;
  const Key = `${folder}/${uuid()}${path.extname(originalname)}`;
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: 'public-read'
  };
  const result = await s3.upload(uploadParams).promise();
  return result.Location;
};

module.exports = {
  trackMulterUpload,
  s3Upload
};
