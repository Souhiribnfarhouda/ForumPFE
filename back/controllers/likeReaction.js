const { prisma } = require("../utils/prismaConnect");

async function likeReaction(req, res) {
  const { postId } = req.params;
  const { reaction, userId } = req.body;
  const posts = await prisma.post.findUnique({
    where: { id: postId },
  });

  const NewReaction = posts?.reaction || [];

  const index = NewReaction.findIndex((e) => e.userId === userId);

  if (index !== -1) {
    if (NewReaction[index].type === "like") NewReaction.splice(index, 1);
    else NewReaction.splice(index, 1, { userId, type: "like" });
  } else {
    NewReaction.push({ userId, type: "like" });
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { reaction: NewReaction },
  });
  res.json(updatedPost);
}
module.exports = { likeReaction };
