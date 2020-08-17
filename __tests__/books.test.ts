import { makeBooks } from '../src/lib/books'
import { makeDB } from '../src/lib/db'
import { generate as generateId }from 'shortid'

describe('books controller', () => {
  let Books
  let db
  let ids: string[]
  let seed

  beforeEach(() => {
    seed = [
      {
        title: 'Harry Potter and the Sorcerers Stone',
        author: 'J.K. Rowling'
      },
      {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling'
      },
      {
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'J.K. Rowling'
      }
    ].map((x) => Object.assign({ _id: generateId() }, x))

    db = makeDB({ books: seed, authors: [] })
    Books = makeBooks(db)
  })

  it('should be able to get all books', () => {
   const books = Books.getAll() 

   expect(books).toEqual(seed)
  })

  it('should be able to get books by id', () => {
    const book = Books.getById(seed[0]._id)

    expect(book).toEqual(seed[0])
  })

  it('should be able to create a book', () => {
    const book = Books.create('Harry Potter and the Order of the Phonix', 'J.K. Rowling')

    expect(Books.getAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Harry Potter and the Order of the Phonix',
          author: 'J.K. Rowling'
        })
      ])
    )

    expect(book).toEqual(
      expect.objectContaining({
        title: 'Harry Potter and the Order of the Phonix',
        author: 'J.K. Rowling'
      })
    )
  })

  it('should be able to update a book', () => {
    const updatedBook = Books.update(
      seed[0]._id,
      { author: 'J.K. Rowling'
      , title: 'Harry Potter and the Philosiphers Stone' 
      }
    )

    expect(Books.getById(seed[0]._id)).toEqual({
      _id: seed[0]._id,
      author: 'J.K. Rowling',
      title: 'Harry Potter and the Philosiphers Stone' 
    })

    expect(updatedBook).toEqual({
      _id: seed[0]._id,
      author: 'J.K. Rowling',
      title: 'Harry Potter and the Philosiphers Stone' 
    })
  })

  it('should be able to delete a book', () => {
    const expectedId = seed[0]._id
    const deletedBookId = Books.delete(seed[0]._id)

    expect(deletedBookId).toEqual(expectedId)
    expect(Books.getAll()).toHaveLength(2)
  })
})
