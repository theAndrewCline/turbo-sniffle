import { generate as generateId } from 'shortid'

export type Book = {
  _id: string
  title: string
  author: string
}

export function makeBooks(db) {
  return {
    getAll: (): Book[] => {
      return db.get('books').value()
    },
    getById: (id: string): Book => {
      return db.get('books').find({ _id: id }).value()
    },
    create: (title, author): Book => {
      const book = {
        _id: generateId(),
        title,
        author
      }

      db.get('books').push(book).write()

      return book
    },
    update: (id: string, updates: { title: string; author: string }): Book => {
      db.get('books').find({ _id: id }).assign(updates).write()

      const book = {
        _id: id,
        title: updates.title,
        author: updates.author
      }

      return book
    },
    delete: (id: string): string => {
      db.get('books').remove({ _id: id }).write()

      return id
    }
  }
}
