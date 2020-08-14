const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  type Query {
    books: [Book]
    authors(name: String): [Author]
  }
`

module.exports = {
  typeDefs
}
