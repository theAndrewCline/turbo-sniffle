import * as lowdb from 'lowdb'
import * as Memory from 'lowdb/adapters/Memory'
import * as FileSync from 'lowdb/adapters/FileSync'

export function makeDB (seed?) {
  const adapter = process.env.NODE_ENV === 'test'
    ? new Memory()
    : new FileSync('../../live/db.json')

  const db = lowdb(adapter)

  if (seed) {
    db.defaults(seed).write()
  } else {
    db.defaults({
      authors: []
    }).write()
  }

  return db
}