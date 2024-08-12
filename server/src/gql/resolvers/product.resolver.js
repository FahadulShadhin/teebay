const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productResolver = {
  products: async () => {
    try {
      return await prisma.product.findMany({
        include: { user: true },
      });
    } catch (error) {
      console.log('Error while fetching products', error);
      throw new Error('Error while fetching products');
    }
  },

  product: async ({ id }) => {
    try {
      return await prisma.product.findUnique({
        where: { id: id },
        include: { user: true },
      });
    } catch (error) {
      console.log('Error while fetching product', error);
      throw new Error('Error while fetching product');
    }
  },

  createProduct: async ({
    title,
    categories,
    description,
    purchasePrice,
    rentPrice,
    userId,
  }) => {
    try {
      return await prisma.product.create({
        data: {
          title,
          categories,
          description,
          purchasePrice,
          rentPrice,
          user: { connect: { id: userId } },
        },
        include: { user: true },
      });
    } catch (error) {
      console.log('Error while creating product');
      throw new Error('Error while creating product');
    }
  },

  updateProduct: async ({
    id,
    title,
    categories,
    description,
    purchasePrice,
    rentPrice,
  }) => {
    try {
      return await prisma.product.update({
        where: { id: id },
        data: {
          title,
          categories,
          description,
          purchasePrice,
          rentPrice,
        },
      });
    } catch (error) {
      console.log('Error while updating product');
      throw new Error('Error while updating product');
    }
  },

  deleteProduct: async ({ id }) => {
    try {
      return await prisma.product.delete({
        where: { id: id },
      });
    } catch (error) {
      console.log('Error while deleting product');
      throw new Error('Error while deleting product');
    }
  },
};

module.exports = productResolver;
