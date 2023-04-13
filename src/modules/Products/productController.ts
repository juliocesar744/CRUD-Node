
import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import Product from './Product';

const prisma = new PrismaClient()

export const productRoute = Router();
 
productRoute.post('/', (req, res) => {
  let productReceiveid: Product = req.body[0]
  productCreate(productReceiveid)
  .then(async (e) => {
    res.send("O produto " + e.description + " foi cadastrado com sucesso!")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
      res.send("Erro na inserção, confira seus dados")
      console.error(e)
    await prisma.$disconnect()
  })
});

productRoute.get('/', (req, res) => {
  listProduct()
  .then(async (e) => {
    res.send(e)
    await prisma.$disconnect()
  })
  .catch(async (e) => {
      res.send("Erro na inserção, confira seus dados")
      console.error(e)
    await prisma.$disconnect()
  })
});

productRoute.delete('/', (req, res) => {
  productDelete(req.body[0].id)
  .then(async (e) => {
    res.send("Registro deletado com sucesso " + e.description)
    await prisma.$disconnect()
  })
  .catch(async (e) => {
      res.send("Não possível deletar, tente novamente")
      console.error(e)
    await prisma.$disconnect()
  })
});

async function listProduct() {
  const products = await prisma.products.findMany()
  return products;
}

async function productDelete(idToDelete: number) {
  const deleteProduct = await prisma.products.delete({
    where: {
      id: idToDelete,
    },
  })
  return deleteProduct;
}

async function productCreate(productReceiveid : Product) {
  const user = await prisma.products.create({
    data: {
      description: productReceiveid.description,
      price: productReceiveid.price,
    },
  })
  return user;
}
 
export default productRoute;