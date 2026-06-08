import { getDb } from './db';

type MigrationType = () => void;

const db = getDb();

function initializeSchema() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Manga table
  db.exec(`
    CREATE TABLE IF NOT EXISTS manga (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idMal INTEGER UNIQUE NOT NULL,
      titles TEXT[] NOT NULL,
      type TEXT NOT NULL,
      format TEXT NOT NULL,
      status TEXT NOT NULL,
      chapters INTEGER,
      volumes INTEGER,
      owned_volumes TEXT,
      genres TEXT[] NOT NULL,
      cover_image BUFFER NOT NULL,
      mime_type TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database schema initialized');
}

//
const migrations: Record<number, MigrationType> = {
  1: () => initializeSchema(),
};

export async function runMigrations() {
  // ensure migration table exists
  db.exec(
    `CREATE TABLE IF NOT EXISTS _migrations (
        version INTEGER PRIMARY KEY
    )`,
  );

  // get the current max version
  const currentVersionResult = db
    .prepare('SELECT MAX(version) as v FROM _migrations')
    .get();
  const currentVersion =
    (currentVersionResult as { v: number } | undefined)?.v || 0;

  // sort versions
  const versions = Object.keys(migrations)
    .map(Number)
    .sort((a, b) => a - b);

  // run migrations bigger than current
  for (const version of versions) {
    if (version <= currentVersion) {
      continue;
    }

    console.log(`Running migration ${version}...`);

    try {
      // Run the migration inside a transaction for safety
      const migrationTx = db.transaction(() => {
        migrations[version]();
        db.prepare('INSERT INTO _migrations (version) VALUES (?)').run(version);
      });
      migrationTx();

      console.log(`Migration ${version} completed.`);
    } catch (error) {
      console.error(`Migration ${version} failed:`, error);
      throw error;
    }
  }
}
