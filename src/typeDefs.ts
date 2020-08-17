import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    books(id: String, title: String): [Book]
    authors(id: String, name: String): [Author]
  }

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

  type Mutation {
    createAuthor(name: String): Author
    deleteAuthor(id: String): ID

    createBook(title: String, author_id: String): Book
    deleteBook(id: String): ID
  }

  type ID {
    _id: String
  }
`
