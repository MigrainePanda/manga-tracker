import { getDb } from '../database/db';

// main User type
interface UserType {
  id: number;
  username: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

// result directly from table
interface UserDBRow {
  id: number;
  username: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// Helper to convert SQLite row to JS object with parsed dates
const mapDBRowToType = (dbRow: UserDBRow): UserType => {
  return {
    ...dbRow,
    created_at: new Date(dbRow.created_at),
    updated_at: new Date(dbRow.updated_at),
  };
};

const DB_NAME = 'users';

// model to interact with
const UserModel = {
  create(username: string, name: string) {
    const db = getDb();
    const stmt = db.prepare<{
      username: string;
      name: string;
    }>(`INSERT INTO ${DB_NAME} (username, name) VALUES (:username, :name)`);
    const info = stmt.run({
      username: username,
      name: name,
    });
    return {
      id: info.lastInsertRowid,
      username: username,
      name: name,
    };
  },

  getAll() {
    const db = getDb();
    const stmt = db.prepare(
      `SELECT * from ${DB_NAME} ORDER BY created_at DESC`,
    );
    const rows = stmt.all() as UserDBRow[];
    const allUsers = rows.map((user) => mapDBRowToType(user));
    return allUsers;
  },

  getById(id: number) {
    const db = getDb();
    const stmt = db.prepare(`SELECT * FROM ${DB_NAME} WHERE id = :id`);
    const rows = stmt.get({ id }) as UserDBRow;
    const user = mapDBRowToType(rows);
    return user;
  },

  update(id: number, name: string) {
    const db = getDb();
    const stmt = db.prepare<{ id: number; name?: string }>(`
      UPDATE ${DB_NAME} SET name = :name, updated_at = CURRENT_TIMESTAMP 
      WHERE id = :id
    `);
    stmt.run({ id, name });
    return this.getById(id);
  },

  delete(id: number) {
    const db = getDb();
    const stmt = db.prepare<{ id: number; name?: string }>(
      `DELETE FROM ${DB_NAME} WHERE id = :id`,
    );
    stmt.run({ id });
  },
};

export type { UserType };

export { UserModel };
