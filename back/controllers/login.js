const { prisma } = require("../utils/prismaConnect");

async function login(req, res) {
  const userExist = await prisma.user.findFirst({
    where: { email: req.body.email },
  });

  if (!userExist) {
    const newUser = await prisma.user.create({
      data: req.body,
    });

    return res.json(newUser);
  }

  return res.json(userExist);
}

async function loginAdmin(req, res) {
  const userExist = await prisma.user.findFirst({
    where: { ...req.body, role: "admin" },
  });

  return res.json(userExist);
}

module.exports = { login, loginAdmin };
