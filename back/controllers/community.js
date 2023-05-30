const { prisma } = require("../utils/prismaConnect");

async function getMyCommunity(req, res) {
  const userId = req.params.userId;
  if (!userId) return res.json([]);

  const communities = await prisma.community.findMany({
    where: {
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },
    include: { owner: true },
  });

  const users = await prisma.user.findMany();

  return res.json(
    communities.map((e) => ({
      ...e,
      members: e.members.map((m) => ({
        ...m,
        user: users.find((u) => u.id === m.userId),
      })),
    }))
  );
}

async function getAllCommunity(req, res) {
  const communities = await prisma.community.findMany({
    include: { owner: true },
  });
  const users = await prisma.user.findMany();
  return res.json(
    communities.map((e) => ({
      ...e,
      members: e.members.map((m) => ({
        ...m,
        user: users.find((u) => u.id === m.userId),
      })),
    }))
  );
}

async function getOwnedCommunity(req, res) {
  const userId = req.params.userId;
  const communities = await prisma.community.findMany({
    where: { ownerId: userId },
    include: { owner: true },
  });

  const users = await prisma.user.findMany();
  return res.json(
    communities.map((e) => ({
      ...e,
      members: e.members.map((m) => ({
        ...m,
        user: users.find((u) => u.id === m.userId),
      })),
    }))
  );
}

async function addCommunity(req, res) {
  const community = await prisma.community.create({
    data: req.body,
  });

  await Promise.all(
    req.body.members.map((member) =>
      prisma.notification.create({
        data: {
          notifiedUserId: member.userId,
          communityId: community.id,
          createdAt: new Date(),
        },
      })
    )
  );

  return res.json(community);
}

async function updateCommunity(req, res) {
  const prevCommunity = await prisma.community.findUnique({
    where: { id: req.params.id },
  });

  const community = await prisma.community.update({
    where: { id: req.params.id },
    data: req.body,
  });

  const promise = [];

  req.body.members.map((member) => {
    if (!prevCommunity.members.find((e) => e.userId === member.userId))
      promise.push(
        prisma.notification.create({
          data: {
            notifiedUserId: member.userId,
            communityId: community.id,
            createdAt: new Date(),
          },
        })
      );
  });

  await Promise.all(promise);

  return res.json(community);
}

async function deleteCommunity(req, res) {
  await prisma.community.delete({
    where: { id: req.params.id },
  });

  return res.json("community deleted");
}

module.exports = {
  getMyCommunity,
  getOwnedCommunity,
  addCommunity,
  updateCommunity,
  deleteCommunity,
  getAllCommunity,
};
