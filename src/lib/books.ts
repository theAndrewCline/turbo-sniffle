import { generate as generateId } from 'shortid'
export function makeBooks (db) {

  return {
    getAll: () => {
      return db.get('books').value()
    },
    getById: (id: string) => {
      return db.get('books').find({ _id: id }).value()
    },
    create: (title, author) => {
      const book = {
        _id: generateId(),
        title,
        author
      }

      db.get('books').push(book).write()

      return book
    },
    update: (
      id: string,
      updates: { title: string, author: string }
    ) => {

      db.get('books')
        .find({ _id: id })
        .assign(updates)
        .write()

      const book = {
        _id: id,
        title: updates.title,
        author: updates.author
      }

      return book
    },
    delete: (id: string) => {
      db.get('books')
        .remove({ _id: id })
        .write()

      return id
    }
  }
}
