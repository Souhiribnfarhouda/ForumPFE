const { prisma } = require("../utils/prismaConnect");

async function getPostsByUser(req, res) {
  const { userId } = req.params;
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  res.json(posts);
}
module.exports = { getPostsByUser };
