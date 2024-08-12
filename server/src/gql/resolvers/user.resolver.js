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

	createUser: async ({
		firstName,
		lastName,
		email,
		address,
		phoneNumber,
		password,
		confirmPassword,
	}) => {
		if (password !== confirmPassword) {
			throw new Error('Passwords do not match');
		}
		try {
			return await prisma.user.create({
				data: {
					firstName,
					lastName,
					email,
					address,
					phoneNumber,
					password,
					confirmPassword,
				},
			});
		} catch (error) {
			console.log('Error while creating user', error);
			throw new Error('Error while creating User');
		}
	},

	updateUser: async ({
		id,
		firstName,
		lastName,
		email,
		address,
		phoneNumber,
	}) => {
		try {
			return await prisma.user.update({
				where: { id: id },
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
};

module.exports = userResolver;
