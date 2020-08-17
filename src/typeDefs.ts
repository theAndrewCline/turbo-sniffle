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
    createBook(args: { title: String, author: String }): Book
    updateBook(id: String, args: { title: String, author: String }): Book
    deleteBook(id: String): String

    createAuthor(String, args: { name: String, books: Book[] }): Author
    updateAuthor(id: String, args: { name: String, books: Book[] }: Author
    deleteAuthor(id: String): String
  }
`
