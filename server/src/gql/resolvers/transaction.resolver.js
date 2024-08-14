const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const transactionResolver = {
  createTransaction: async (
    { type, productId, rentStartDate, rentEndDate },
    context,
    _
  ) => {
    const { userId } = context.user;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });

    if (product?.user?.id === userId) {
      throw new Error(`Can't buy or rent own product`);
    }

    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          type,
          fromUser: { connect: { id: product?.user?.id } },
          toUser: { connect: { id: userId } },
          product: { connect: { id: productId } },
          rentStartDate,
          rentEndDate,
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
