import { books as getBooks } from './books'
import { authors as getAuthors } from './authors'

const authors = (_p, args) => {
  if (args.name) {
    return getAuthors().filter((x) => x.name === args.name)
  } else {
    return getAuthors()
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
