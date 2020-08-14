const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./typeDefs')
const books = require('./books')
const authors = require('./authors')

const resolvers = {
  Query: {
    books: () => books(),
    authors: (_p, args) => {
      if (args.name) {
        return authors().filter((x) => x.name === args.name)
      } else {
        return authors()
      }
    }
  },
  Author: {
    name: (author) => author.name,
    books: (author) => books().filter((x) => x.author === author.name)
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
