const express = require("express");
const { addPost } = require("../controllers/addPost");
const { getAllPosts } = require("../controllers/getPost");
const { deletePost } = require("../controllers/deletePost");
const { getPostsByUser } = require("../controllers/getPostsByUser");
const { addComment } = require("../controllers/addComment");
const { getCommentsByPost } = require("../controllers/getCommentsByPost");
const { getCommentsByUser } = require("../controllers/getCommentsByUser");
const { login, loginAdmin } = require("../controllers/login");
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  getMyCommunity,
  getOwnedCommunity,
  addCommunity,
  updateCommunity,
  deleteCommunity,
  getAllCommunity,
} = require("../controllers/community");
const { getNotifications } = require("../controllers/getNotification");
const { addDraftPost } = require("../controllers/addDraftPost");
const { getDraftPostsByUser } = require("../controllers/getDraftPostsByUser");
const { sadReaction } = require("../controllers/sadReaction");
const { likeReaction } = require("../controllers/likeReaction");
const { loveReaction } = require("../controllers/loveReaction");
const { angryReaction } = require("../controllers/angryReaction");
const { getPostById } = require("../controllers/getPostById");

const apiRouter = express.Router();

apiRouter.post("/auth/callback", login);
apiRouter.post("/auth/admin", loginAdmin);

apiRouter.post("/post", addPost);
apiRouter.post("/comment", addComment);
apiRouter.get("/post", getAllPosts);
apiRouter.get("/post/:userId", getPostsByUser);
apiRouter.get("/comment/:postId", getCommentsByPost);
apiRouter.get("/post/comment/:userEmail", getCommentsByUser);
apiRouter.delete("/post/:postId", deletePost);

apiRouter.get("/draftPost/:userId", getDraftPostsByUser);
apiRouter.post("/draftPost", addDraftPost);

apiRouter.route("/user").get(getUsers).post(addUser);
apiRouter.route("/user/:id").get(getUser).put(updateUser).delete(deleteUser);

apiRouter.route("/community").post(addCommunity);
apiRouter.route("/community/:userId").get(getMyCommunity);
apiRouter.route("/getcommunity").get(getAllCommunity);
apiRouter.route("/community/:userId/own").get(getOwnedCommunity);
apiRouter.route("/community/:id").put(updateCommunity).delete(deleteCommunity);

apiRouter.get("/notifications/:id", getNotifications);
apiRouter.put("/post/:postId/sadReaction", sadReaction);
apiRouter.put("/post/:postId/likeReaction", likeReaction);
apiRouter.put("/post/:postId/loveReaction", loveReaction);
apiRouter.put("/post/:postId/angryReaction", angryReaction);
apiRouter.get("/getpost/:postId", getPostById);

module.exports = apiRouter;
