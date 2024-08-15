const express = require('express');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
require('dotenv').config({ path: './.env' });
const schema = require('./gql/schema.js');
const { root } = require('./gql/resolvers/index.js');
const authMiddleware = require('./middlewares/auth.middleware.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
    context: async (req) => {
      try {
        const { userId, email } = authMiddleware(req.headers.authorization);
        return { user: { userId, email } };
      } catch (error) {
        return { user: {} };
      }
    },
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
