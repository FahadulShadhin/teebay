const productResolver = require('./product.resolver.js');
const userResolver = require('./user.resolver.js');
const authResolver = require('./auth.resolver.js');
const transactionResolver = require('./transaction.resolver.js');

const root = {
  ...userResolver,
  ...productResolver,
  ...transactionResolver,
  ...authResolver,
};

module.exports = { root };
