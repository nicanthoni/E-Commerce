const express = require('express');
const app = express();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const PORT = process.env.PORT || 3001;
const path = require('path');
const cors = require('cors');
const routes = require('./controller/');

require('dotenv').config();

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  // Middleware
  // app.use((req, res, next) => {
  //   console.log(`Incoming request: ${req.method} ${req.url}`);
  //   next();
  // });

  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Use routes
  app.use(routes);

  // Serve static files
  app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Use uploads router for file uploads

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
