const { prisma } = require("../utils/prismaConnect");

async function getUsers(req, res) {
  const user = await prisma.user.findMany();

  return res.json(user);
}

async function getUser(req, res) {
  const userId = req.params.id;
  if (!userId) return res.json();
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return res.json(user);
}

async function addUser(req, res) {
  const user = await prisma.user.create({
    data: req.body,
  });

  return res.json(user);
}

async function updateUser(req, res) {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body,
  });

  return res.json(user);
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  // Delete the associated notifications

  // await prisma.community.deleteMany({
  //   where: { ownerId: userId },
  // });

  // await prisma.notification.deleteMany({
  //   where: {
  //     notifiedUserId: userId,
  //   },
  // });
  // await prisma.notification.deleteMany({
  //   where: {
  //     communityId: comm.id,
  //   },
  // });

  // Delete the user
  await prisma.user.delete({
    where: { id: userId },
  });

  return res.json("User and associated notifications deleted");
}
module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
