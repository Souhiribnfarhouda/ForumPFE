const { prisma } = require("../utils/prismaConnect");

async function getPostById(req, res) {
const { postId } = req.params;

  const posts = await prisma.post.findMany({
  where: {
      id: postId,
    },
    include: { community: true, user: true },

  });
  res.json(posts);

}

module.exports = { getPostById };
