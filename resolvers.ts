import { books } from './books'
import { authors } from './authors'

export const resolvers = {
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
