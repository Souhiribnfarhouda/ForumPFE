const { Request, Response } = require("express");
const { prisma } = require("../utils/prismaConnect");

async function addComment(req, res) {
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      postId: req.body.postId,
      userId: req.body.userId,
      userImg: req.body.userImg,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      createdAt: new Date(),
    },
  });

  res.json(comment);
}

module.exports = { addComment };
