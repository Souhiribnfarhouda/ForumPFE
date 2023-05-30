const { prisma } = require("../utils/prismaConnect");

async function getDraftPostsByUser(req, res) {
  const { userId } = req.params;
  const posts = await prisma.draftPost.findMany({
    where: {
      userId,
    },
  });
  res.json(posts);
}
module.exports = { getDraftPostsByUser };
