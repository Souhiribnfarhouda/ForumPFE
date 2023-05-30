const { prisma } = require("../utils/prismaConnect");



async function deletePost(req, res) {
  const { postId } = req.params;
   await prisma.post.delete({
    where: { id: postId },
  });

  return res.json("Post deleted");
}

module.exports = {deletePost };
