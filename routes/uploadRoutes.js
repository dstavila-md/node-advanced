const AWS = require("aws-sdk");
const keys = require("../config/keys.js");
const uuid = require("uuid/v1");
const requireLogin = require("../middlewares/requireLogin");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: "us-east-1",
});

module.exports = (app) => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const fileType = req.query.fileType;
    const fileExt = fileType.substring(fileType.indexOf("/") + 1);
    const key = `${req.user.id}/${uuid()}.${fileExt}`;

    const params = {
      Bucket: "des-blogster-bucket",
      ContentType: fileType,
      Key: key,
    };

    s3.getSignedUrl("putObject", params, (err, url) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: "Error generating signed URL" });
      }
      res.send({ key, url });
    });
  });
};
