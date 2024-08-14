const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productResolver = {
  products: async () => {
    try {
      return await prisma.product.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' },
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

  createProduct: async (
    { title, categories, description, purchasePrice, rentPrice, rentPriceType },
    context,
    _
  ) => {
    const { userId } = context.user;
    try {
      return await prisma.product.create({
        data: {
          title,
          categories,
          description,
          purchasePrice,
          rentPrice,
          rentPriceType,
          user: { connect: { id: userId } },
        },
        include: { user: true },
      });
    } catch (error) {
      console.log('Error while creating product', error);
      throw new Error('Error while creating product');
    }
  },

  updateProduct: async (
    { id, title, categories, description, purchasePrice, rentPrice },
    context,
    _
  ) => {
    const { userId } = context.user;

    const product = await prisma.product.findUnique({
      where: { id: id },
      include: { user: true },
    });

    const ownerId = product?.user?.id;
    if (!ownerId || userId !== ownerId) {
      throw new Error('Unauthorized to update this product');
    }

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

  deleteProduct: async ({ id }, context, _) => {
    const { userId } = context.user;

    const product = await prisma.product.findUnique({
      where: { id: id },
      include: { user: true },
    });

    const ownerId = product?.user?.id;
    if (!ownerId || userId !== ownerId) {
      throw new Error('Unauthorized to delete this product');
    }

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
