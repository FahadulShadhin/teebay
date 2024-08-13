const { buildSchema } = require('graphql');

const userTypeSchema = `
	type User {
		id: Int
		firstName: String
		lastName: String
		email: String
		address: String
		phoneNumber: String
		createdAt: String
		updatedAt: String
		products: [Product]
	}
`;

const productTypeSchema = `
	enum Category {
		ELECTRONICS
    FURNITURE
    HOME_APPLIANCES
    SPORTING_GOODS
    OUTDOOR
    TOYS
	}

	type Product {
    id: Int
    title: String
    categories: [Category]
    description: String
    purchasePrice: Float
    rentPrice: Float
    createdAt: String
    updatedAt: String
    user: User
  }
`;

const queryTypeSchema = `
  type Query {
    users: [User]
    user(id: Int!): User
    products: [Product]
    userProduct(id: Int!): Product
		userProducts: [Product]
  }
`;

const registerUserMutationSchema = `
	signup(
		firstName: String!,
		lastName: String!,
		email: String!,
		address: String!,
		phoneNumber: String!,
		password: String!,
		confirmPassword: String!
	): String
`;

const loginUserMutationSchema = `
	login(
		email: String!
		password: String!
	): String
`;

const createProductMutationSchema = `
	createProduct(
		title: String!,
		categories: [Category!]!,
		description: String!,
		purchasePrice: Float!,
		rentPrice: Float!,
	): Product
`;

const updateUserMutationSchema = `
	updateUser(
		firstName: String,
		lastName: String,
		email: String,
		address: String,
		phoneNumber: String
	): User
`;

const deleteProductMutationSchema = `
	deleteProduct(id: Int!): Product
`;

const updateProductMutationSchema = `
	updateProduct(
		id: Int!,
		title: String,
		categories: [Category],
		description: String,
		purchasePrice: Float,
		rentPrice: Float
	): Product
`;

const mutationTypeSchema = `
  type Mutation {
		${registerUserMutationSchema}
		${loginUserMutationSchema}
		${createProductMutationSchema}
		${updateUserMutationSchema}
		${updateProductMutationSchema}
		${deleteProductMutationSchema}
	}
`;

const schema = buildSchema(`
	${userTypeSchema}
	${productTypeSchema}
  ${queryTypeSchema}
  ${mutationTypeSchema}
`);

module.exports = schema;
