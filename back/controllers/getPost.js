const { prisma } = require("../utils/prismaConnect");

async function getAllPosts(req, res) {
  const userId = req.query.userId;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { community: true, user: true },
  });

  res.json(
    posts.filter(
      (e) =>
        e.userId === userId ||
        !e.communityId ||
        e.community.type === "public" ||
        e.community.ownerId === userId ||
        e.community.members.find((e) => e.userId === userId)
    )
  );
}

module.exports = { getAllPosts };
