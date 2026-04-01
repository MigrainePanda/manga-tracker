import Database from 'better-sqlite3';
import config from '../config/config.ts';

const db = new Database(config.dbPath, {});
db.pragma('journal_mode = WAL');

export default db;
