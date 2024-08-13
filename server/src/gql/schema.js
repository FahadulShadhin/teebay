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
    product(id: Int!): Product
		userProducts(userId: Int!): [Product]
  }
`;

const createUserMutationSchema = `
	createUser(
		firstName: String!,
		lastName: String!,
		email: String!,
		address: String!,
		phoneNumber: String!,
		password: String!,
		confirmPassword: String!
	): User
`;

const createProductMutationSchema = `
	createProduct(
		title: String!,
		categories: [Category!]!,
		description: String!,
		purchasePrice: Float!,
		rentPrice: Float!,
		userId: Int!
	): Product
`;

const updateUserMutationSchema = `
	updateUser(
		id: Int!,
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
		${createUserMutationSchema}
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
