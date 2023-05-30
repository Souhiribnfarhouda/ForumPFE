import express from 'express';
import { prisma } from '../../utils/prismaConnect';

const apiRouter = express.Router();

// POST /api/posts - create a new post
apiRouter.post('/posts', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating post' });
  }
});

export { apiRouter };
