import { makeBooks, Book } from './books'
import { makeAuthors, Author } from './authors'
import { makeDB } from './db'

const db = makeDB()
const Authors = makeAuthors(db)
const Books = makeBooks(db)

const authors = (_root, args) => {
  if (args.name) {
    return Authors.getAll().filter(x => x.name === args.name)
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
    return Books.getAll().filter(x => x.title === args.title)
  } else {
    return Books.getAll()
  }
}

export const resolvers = {
  Query: {
    books,
    authors,
  },
  Author: {
    name: (author: Author) => author.name,
    books: (author: Author) => 
      Books.getAll()
           .filter((x) => x.author === author.name)
  },
  Book: {
    title: (book: Book) => book.title,
    author: (book: Book) => Authors.getById(book.author)
  }
}
