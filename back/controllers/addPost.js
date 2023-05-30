const { Request, Response } = require("express");
const { prisma } = require("../utils/prismaConnect");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dh2ynmctq",
  api_key: "776338379726728",
  api_secret: "pTWmhqCKrD81d0wtlxlLkpk8OfA",
});
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`); // generate a unique filename for each uploaded image
  },
});

const upload = multer({ storage });
async function addPost(req, res) {
  console.log(req.body)
  upload.single("image")(req, res, async (err) => {
    const result = await cloudinary.uploader.upload(req.body.image);

    if (err instanceof multer.MulterError) {
      console.error(err);
      return res.status(400).json({ message: "Failed to upload image" });
    } else if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const post = await prisma.post.create({
      data: {

        title: req.body.title,
        content: req.body.content,
        imageUrl: result.secure_url,
        userId:req.body.userId,
        communityId: req.body.communityId||undefined,
        createdAt: new Date(),
      },
    });

    res.json(post);
  });
}

module.exports = { addPost };
