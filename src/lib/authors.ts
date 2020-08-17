export function makeAuthors (db) {
  return {
    getAll: () => {
      return db.get('authors')
    },
    getById: () => { },
    update: () => { },
    delete: () => { }
  }
}