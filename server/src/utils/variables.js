const dbUrl =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/postgres?schema=public';
const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
const port = process.env.PORT || 5000;

module.exports = { dbUrl, jwtSecret, port };
