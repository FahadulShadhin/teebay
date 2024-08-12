const productResolver = require('./product.resolver.js');
const userResolver = require('./user.resolver.js');

const root = {
  ...userResolver,
  ...productResolver,
};

module.exports = root;
