const { } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    test: async () => {
      return 'test'
    }
  },
  // Mutation: {

  // },
}
module.exports = resolvers
