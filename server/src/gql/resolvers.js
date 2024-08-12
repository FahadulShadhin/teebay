const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const root = {
	users: async () => {
		return await prisma.user.findMany({
			include: { products: true },
		});
	},
	user: async ({ id }) => {
		return await prisma.user.findUnique({
			where: { id: id },
			include: { products: true },
		});
	},
	products: async () => {
		return await prisma.product.findMany({
			include: { user: true },
		});
	},
	product: async ({ id }) => {
		return await prisma.product.findUnique({
			where: { id: id },
			include: { user: true },
		});
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
	},
	createProduct: async ({
		title,
		categories,
		description,
		purchasePrice,
		rentPrice,
		userId,
	}) => {
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
	},
	updateUser: async ({
		id,
		firstName,
		lastName,
		email,
		address,
		phoneNumber,
	}) => {
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
	},
	updateProduct: async ({
		id,
		title,
		categories,
		description,
		purchasePrice,
		rentPrice,
	}) => {
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
	},
	deleteProduct: async ({ id }) => {
		return await prisma.product.delete({
			where: { id: id },
		});
	},
};

module.exports = root;
