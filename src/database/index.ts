import { TAny } from '../types'
import { IDb } from './types'
import dbSource, { OPEN_READONLY, OPEN_READWRITE, OPEN_CREATE } from './sqlite3'
import config from '../config'

const db: IDb = {}

const editOrCreateDb = (dbName: string): TAny => {
  const res = new dbSource.Database(`${config.path}/${dbName}${config.extension}`, OPEN_READWRITE | OPEN_CREATE)
  db[dbName] = res

  return res
}

const openDb = (dbName: string): TAny => {
  if (db[dbName]) {
    return db[dbName]
  }

  const res = new dbSource.Database(`${config.path}/${dbName}${config.extension}`, OPEN_READONLY)
  db[dbName] = res

  return res
}

const closeDb = (dbName: string): boolean => {
  if (db[dbName]) {
    db[dbName].close()
    delete db[dbName]

    return true
  }

  return false
}

const closeAllDb = (): void => {
  for (var key in db) {
    db[key].close()
    delete db[key]
  }
}

export { db, editOrCreateDb, openDb, closeDb, closeAllDb }
