import * as shortid from 'shortid'

export type Author = {
  _id: string
  name: string
  books: string[]
}

export function makeAuthors (db) {
  return {
    getAll: () => {
      return db.get('authors').value()
    },
    getById: (id: string) => {
      return db.get('authors').find({ _id: id }).value()
    },
    create: (name: string, books: string[]) => {
      const author = {
        _id: shortid.generate(),
        name,
        books,
      }

      db.get('authors').push(author).write()

      return author
    },
    update: (
      id: string,
      updates: { books: string[], name: string }
    ) => {

      db.get('authors')
        .find({ _id: id })
        .assign(updates)
        .write()

      const author = {
        _id: id,
        books: updates.books,
        name: updates.name
      }

      return author
    },
    delete: (id: string) => {
      db.get('authors')
        .remove({ _id: id })
        .write()

        return id
    }
  }
}
