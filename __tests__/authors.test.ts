import { makeDB } from '../src/lib/db'
import * as shortid from 'shortid'

import { makeAuthors, Author } from '../src/lib/authors'

describe('authors db interface', () => {
  let seedId: string
  let seedAuthors: { 
    authors: Author[]
  }
  let db  
  let Authors

  beforeEach(() => {
    seedId = shortid.generate()
    seedAuthors = {
      authors: [
        {
          _id: seedId,
          name: 'J.K. Rowling',
          books: ['1', '2', '3', '4']
        }
      ]
    }
    db = makeDB(seedAuthors)
    Authors = makeAuthors(db)
  })

  it('should be able to get all authors', () => {
    expect(Authors.getAll()).toEqual(
        [
          {
            _id: seedId,
            name: 'J.K. Rowling',
          books: ['1', '2', '3', '4']
          }
        ]
    )
  })

  it('should be able to create authors', () => {
    const lewis = {
      name: 'C.S. Lewis',
      books: ['1']
    }

    const newAuth = Authors.create('C.S. Lewis', ['1'])
    const authors = Authors.getAll()

    expect(authors).toHaveLength(2)

    expect(authors).toEqual(
      expect.arrayContaining([expect.objectContaining(lewis)])
    )

    expect(newAuth).toEqual(
      expect.objectContaining(lewis)
    )
  })

  it('should be able to get Author By id', () => {
    expect(Authors.getById(seedId)).toEqual(seedAuthors.authors[0])
  })

  it('should be able to update an author', () => {
    const updatedAuthor = Authors.update(
      seedId, 
      {
        name: seedAuthors.authors[0].name,
        books: [...seedAuthors.authors[0].books, '5'],
      }
    )

    expect(updatedAuthor).toEqual({
      _id: seedId,
      name: seedAuthors.authors[0].name,
      books: ['1', '2', '3', '4', '5']
    })

    const updates = Authors.getById(seedId)

    expect(updates).toEqual({
      _id: seedId,
      name: seedAuthors.authors[0].name,
      books: ['1', '2', '3', '4', '5']
    })
  })

  it('should be able to delete an author', () => {
    const id = Authors.delete(seedId)

    expect(id).toEqual(seedId)
    expect(Authors.getAll()).toHaveLength(0)
  })
})
