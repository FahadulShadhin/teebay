const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { jwtSecret } = require('../../utils/variables.js');

const prisma = new PrismaClient();

const authResolver = {
  signup: async ({
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    password,
    confirmPassword,
  }) => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const hashedPassword = await bcrypt.hash(password, 15);

      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
          password: hashedPassword,
        },
      });

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        jwtSecret
      );

      return { token, user: newUser };
    } catch (error) {
      console.log('Signup failed', error);
      throw new Error(`Signup failed: ${error.message}`);
    }
  },

  login: async ({ email, password }) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error(`No user found with email ${email}`);
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret);

      return { token, user };
    } catch (error) {
      console.log('Login failed', error);
      throw new Error(`Login failed: ${error.message}`);
    }
  },
};

module.exports = authResolver;
