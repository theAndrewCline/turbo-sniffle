import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Book {
    _id: String
    title: String
    author: Author
  }

  type Author {
    _id: String
    name: String
    books: [Book]
  }

  type Query {
    books(id: String, title: String): [Book]
    authors(id: String, name: String): [Author]
  }
`
