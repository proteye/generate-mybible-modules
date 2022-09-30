import { closeDb, editOrCreateDb } from './database'
import { parseBdagFromTxt } from './helpers/parse_bdag'

const dbName = 'BDAG4.dictionary'

parseBdagFromTxt('resources/bdag_4.txt')

editOrCreateDb(dbName)
closeDb(dbName)
