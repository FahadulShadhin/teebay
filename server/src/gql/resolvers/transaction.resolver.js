const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const transactionResolver = {
  createTransaction: async ({ type, fromUserId, productId }, context, _) => {
    const { userId } = context.user;

    const ownProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });

    if (userId === fromUserId || ownProduct?.user?.id === userId) {
      throw new Error(`Can't buy or rent own product`);
    }

    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          type,
          fromUser: { connect: { id: fromUserId } },
          toUser: { connect: { id: userId } },
          product: { connect: { id: productId } },
        },
      });

      return newTransaction;
    } catch (error) {
      console.log('Error while creating transaction', error);
      throw new Error('Error while creating transaction');
    }
  },
};

module.exports = transactionResolver;
