import Database from 'better-sqlite3';
import config from '../config/config.ts';

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(config.dbPath, {});
    db.pragma('journal_mode = WAL');
  }
  return db;
}
