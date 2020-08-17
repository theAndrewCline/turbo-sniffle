import { makeBooks, Book } from './books'
import { makeAuthors, Author } from './authors'
import { makeDB } from './db'

const db = makeDB()
const Authors = makeAuthors(db)
const Books = makeBooks(db)

const authors = (_root, args) => {
  if (args.name) {
    return Authors.getAll().filter((x) => x.name === args.name)
  } else if (args.id) {
    return [Authors.getById(args.id)]
  } else {
    return Authors.getAll()
  }
}

const books = (_root, args) => {
  if (args.id) {
    return [Books.getById(args.id)]
  } else if (args.title) {
    return Books.getAll().filter((x) => x.title === args.title)
  } else {
    return Books.getAll()
  }
}

export const resolvers = {
  Query: {
    books,
    authors
  },
  Mutation: {
    createAuthor: (_, args): Author => {
      return Authors.create(args.name, [])
    },
    deleteAuthor: (_, args): string => {
      return Authors.delete(args.id)
    },
    createBook: (_, args): Book => {
      const newBook = Books.create(args.title, args.author_id)
      const author = Authors.getById(args.author_id)

      Authors.update(args.author_id, {
        name: author.name,
        books: [...author.books, newBook._id]
      })

      return newBook
    },
    deleteBook: (_, args): string => {
      return Books.delete(args.id)
    }
  },
  Author: {
    name: (author: Author) => author.name,
    books: (author: Author) =>
      author.books.map((book_id) => Books.getById(book_id))
  },
  Book: {
    title: (book: Book) => book.title,
    author: (book: Book) => Authors.getById(book.author)
  }
}
