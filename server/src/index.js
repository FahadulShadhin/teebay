const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const { ruruHTML } = require('ruru/server');
require('dotenv').config({ path: './.env' });

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
	hello() {
		return 'Hello world!';
	},
};

app.all(
	'/graphql',
	createHandler({
		schema: schema,
		rootValue: root,
	})
);

app.get('/', (_req, res) => {
	res.type('html');
	res.end(ruruHTML({ endpoint: '/graphql' }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
