import { closeDb, editOrCreateDb } from '../database'
import { parseBdagFromTxt } from './parse_bdag'

export const fillDatabase = async (srcPath: string, dbName: string) => {
  const items = await parseBdagFromTxt(srcPath)

  const db = editOrCreateDb(dbName)

  db.serialize(() => {
    db.run('DELETE FROM dictionary')

    let index = 0
    const stmt = db.prepare('INSERT INTO dictionary VALUES (?,?)')

    for (const item of items) {
      stmt.run(item.topic, item.definition, (err) => {
        if (err) {
          console.error('err', err)
        }
        console.info(`index = ${index}, topic = ${item.topic}`)
        index += 1
      })
    }

    stmt.finalize()
  })

  closeDb(dbName)
}
