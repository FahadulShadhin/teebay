const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userResolver = {
  users: async () => {
    try {
      return await prisma.user.findMany({
        include: { products: true },
      });
    } catch (error) {
      console.log('Error while fetching users', error);
      throw new Error('Error while fetching users');
    }
  },

  user: async ({ id }) => {
    try {
      return await prisma.user.findUnique({
        where: { id: id },
        include: { products: true },
      });
    } catch (error) {
      console.log('Error while fetching user', error);
      throw new Error('Error while fetching user');
    }
  },

  updateUser: async (
    { firstName, lastName, email, address, phoneNumber },
    context,
    _
  ) => {
    const { userId } = context.user;

    try {
      return await prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
        },
      });
    } catch (error) {
      console.log('Error while updating user', error);
      throw new Error('Error while updating user');
    }
  },

  userProducts: async (_, context, __) => {
    const userId = context.user.userId;

    try {
      const products = await prisma.product.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
      });

      return products;
    } catch (error) {
      console.log(`Error while fetching products for userId: ${userId}`, error);
      throw new Error(`Error while fetching products for userId: ${userId}`);
    }
  },

  userProduct: async ({ id }, context, _) => {
    const { userId } = context.user;

    try {
      const product = await prisma.product.findUnique({
        where: { id: id },
        include: { user: true },
      });
      if (!product) throw new Error('Product not found');

      if (product.user.id !== userId) {
        throw new Error('Unauthorized access');
      }

      return product;
    } catch (error) {
      console.log('Error while fetching product', error);
      throw new Error(`Error while fetching product. error: ${error.message}`);
    }
  },

  userTransactions: async (_, context, __) => {
    const { userId } = context.user;

    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
        include: {
          fromUser: true,
          toUser: true,
          product: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return transactions;
    } catch (error) {
      console.log(
        `Error while fetching transactions for userId: ${userId}`,
        error
      );
      throw new Error(
        `Error while fetching transactions for userId: ${userId}`
      );
    }
  },
};

module.exports = userResolver;
