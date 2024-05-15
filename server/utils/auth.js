const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'The One Piece is real';
const exp = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate User.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  LoginInError: new GraphQLError('User is already logged in.', {
    extensions: {
      code: 'LOGGEDINALREADY',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authMiddleware) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: exp });
      if (req.user) {
        req.user = data;
      } else if (req.vendor) {
        req.vendor = data;
      }
    } catch {
      console.log('Invalid Token');
    }
    return req;
  },
  signToken: function ({ email, _id, userType }) {
    const payload = { email, _id, userType };
    return jwt.sign({ data: payload }, secret, { expiresIn: exp });
  },
};
