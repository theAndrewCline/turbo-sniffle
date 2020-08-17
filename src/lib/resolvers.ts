import { makeBooks } from './books'
import { makeAuthors } from './authors'
import { makeDB } from './db'

const db = makeDB()
const Authors = makeAuthors(db)
const Books = makeBooks(db)

const authors = (_p, args) => {
  if (args.name) {
    return Authors.getAll().filter((x) => x.name === args.name)
  } else {
    return Authors.getAll()
  }
}

const books = () => {
  return Books.getAll()
}

export const resolvers = {
  Query: {
    books,
    authors,
  },
  Author: {
    name: (author: any) => author.name,
    books: (author: any) => 
      Books.getAll()
           .filter((x) => x.author === author.name)
  }
}
