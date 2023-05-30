const { prisma } = require("../utils/prismaConnect");

async function getCommentsByUser(req, res) {
  const { userEmail } = req.params;

  const comments = await prisma.comment.findMany({
    where: {
      userEmail: userEmail,
    },
  });
  res.json(comments);
}
module.exports = { getCommentsByUser };
