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
		transactionsFrom: [Transaction!]
  	transactionsTo: [Transaction!]
	}
`;

const authTypeSchema = `
	type Auth {
		token: String
		user: User
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

	enum RentPriceType {
		DAILY
		WEEKLY
		MONTHLY
	}

	type Product {
    id: Int
    title: String
    categories: [Category]
    description: String
    purchasePrice: Float
    rentPrice: Float
		rentPriceType: RentPriceType
    createdAt: String
    updatedAt: String
    user: User
		transactions: [Transaction!]
  }
`;

const transactionTypeSchema = `
	enum TransactionType {
		BUY
		RENT
	}

	type Transaction {
		id: Int
		type: TransactionType
		rentStartDate: String
		rentEndDate: String
		fromUser: User
		toUser: User
		product: Product
		createdAt: String
		updatedAt: String
	}
`;

const queryTypeSchema = `
  type Query {
    users: [User]
    user(id: Int!): User
    products: [Product]
		product(id: Int!): Product
    userProduct(id: Int!): Product
		userProducts: [Product]
		userTransactions: [Transaction]
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
	): Auth
`;

const loginUserMutationSchema = `
	login(
		email: String!
		password: String!
	): Auth
`;

const createProductMutationSchema = `
	createProduct(
		title: String!
		categories: [Category!]!
		description: String!
		purchasePrice: Float!
		rentPrice: Float!
		rentPriceType: RentPriceType!
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
		rentPrice: Float,
		rentPriceType: RentPriceType
	): Product
`;

const createTransactionMutationSchema = `
	createTransaction(
		type: TransactionType!
		productId: Int!
		rentStartDate: String
		rentEndDate: String
	): Transaction
`;

const mutationTypeSchema = `
  type Mutation {
		${registerUserMutationSchema}
		${loginUserMutationSchema}
		${createProductMutationSchema}
		${updateUserMutationSchema}
		${updateProductMutationSchema}
		${deleteProductMutationSchema}
		${createTransactionMutationSchema}
	}
`;

const schema = buildSchema(`
	${userTypeSchema}
	${productTypeSchema}
	${authTypeSchema}
	${transactionTypeSchema}
  ${queryTypeSchema}
  ${mutationTypeSchema}
`);

module.exports = schema;
