
import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import User from './User';

const prisma = new PrismaClient()

export const userRoute = Router();
 
userRoute.post('/', (req, res) => {
  let userReceiveid: User = req.body[0]
  createUser(userReceiveid)
    .then(async (e) => {
      res.send("O usuário " + e.name + " foi cadastrado com sucesso!")
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      res.send("Erro na inserção, confira seus dados")
      console.error(e)
      await prisma.$disconnect()
    })
});

userRoute.get('/', (req, res) => {
  listUsers()
    .then(async (e) => {
      res.send(e)
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      res.send("Erro na listagem")
      console.error(e)
      await prisma.$disconnect()
    })
});

async function createUser(userReceiveid : User) {
  const user = await prisma.user.create({
    data: {
      name: userReceiveid.name,
      email: userReceiveid.email,
      password: userReceiveid.password,
    },
  })
  return user;
}

userRoute.delete('/', (req, res) => {
  userDelete(req.body[0].id)
  .then(async (e) => {
    res.send("Registro deletado com sucesso " + e.name)
    await prisma.$disconnect()
  })
  .catch(async (e) => {
      res.send("Não possível deletar, tente novamente")
      console.error(e)
    await prisma.$disconnect()
  })
});


async function userDelete(idToDelete: number) {
  const deleteUser = await prisma.user.delete({
    where: {
      id: idToDelete,
    },
  })
  return deleteUser;
}

async function listUsers() {
  const users = await prisma.user.findMany()
  return users;
}

export default userRoute;