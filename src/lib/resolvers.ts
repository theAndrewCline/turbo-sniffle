import { books as getBooks } from './books'
import { makeAuthors } from './authors'
import { makeDB } from './db'

const Authors = makeAuthors(makeDB())

const authors = (_p, args) => {
  if (args.name) {
    return Authors.getAll().filter((x) => x.name === args.name)
  } else {
    return Authors.getAll()
  }
}

const books = () => getBooks

export const resolvers = {
  Query: {
    books,
    authors,
  },
  Author: {
    name: (author: any) => author.name,
    books: (author: any) => getBooks().filter((x) => x.author === author.name)
  }
}
