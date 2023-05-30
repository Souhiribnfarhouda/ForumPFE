const { prisma } = require('../utils/prismaConnect');


async function getCommentsByPost(req, res) {
  const { postId } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    
  });
  res.json(comments);
}
module.exports = { getCommentsByPost };


