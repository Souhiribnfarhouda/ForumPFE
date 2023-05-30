const { prisma } = require("../utils/prismaConnect");

async function getNotifications(req, res) {
  const userId = req.params.userId;

  const notifications = await prisma.notification.findMany({
    where: { notifiedUserId: userId },
    include: { community: { include: { owner: true } } },
  });

  res.json(notifications);
}
module.exports = { getNotifications };
