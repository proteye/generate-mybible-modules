import sqlite3 from 'sqlite3'

export const OPEN_READONLY = sqlite3.OPEN_READONLY

export const OPEN_READWRITE = sqlite3.OPEN_READWRITE

export const OPEN_CREATE = sqlite3.OPEN_CREATE

const isProd: boolean = process.env.NODE_ENV === 'production'

export default isProd ? sqlite3 : sqlite3.verbose()
