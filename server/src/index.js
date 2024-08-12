const express = require('express');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
require('dotenv').config({ path: './.env' });
const schema = require('./gql/schema.js');
const root = require('./gql/resolvers/index.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

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

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
	console.log(`Interact with GraphQL: http://localhost:${PORT}`);
});
