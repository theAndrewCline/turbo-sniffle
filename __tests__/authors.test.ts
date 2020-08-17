import { makeAuthors } from '../src/lib/authors'
import { makeDB } from '../src/lib/db'

describe('authors db interface', () => {
  const db = makeDB({
    authors: [
      {
        name: 'J.K. Rowling',
        books: [1, 2, 3, 4]
      }
    ]
  })

  const Authors = makeAuthors(db)

  it('should have getAuthors Function', () => {
    expect(JSON.stringify(Authors.getAll())).toEqual(
      JSON.stringify(
        [
          {
            name: 'J.K. Rowling',
            books: [1, 2, 3, 4]
          }
        ]
      )
    )
  })
})
