import db from '../database/db.js';

// main User type
interface User {
  id: number;
  username: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

// result directly from table
interface UserRow {
  id: number;
  username: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// Helper to convert SQLite row to JS object with parsed dates
export function mapUser(row: UserRow | undefined): User | undefined {
  if (!row) return undefined;
  return {
    id: row.id,
    username: row.username,
    name: row.name,
    created_at: new Date(row.created_at),
    updated_at: new Date(row.updated_at),
  };
}

// sql statements
const stmts = {
  insert: db.prepare<{ username: string; name: string }>(`
    INSERT INTO users (username, name) VALUES (:username, :name)
  `),

  getAll: db.prepare(`
    SELECT * from users ORDER BY created_at DESC
  `),

  findById: db.prepare<{ id: number }>(`
    SELECT * FROM users WHERE id = :id
  `),

  update: db.prepare<{ id: number; name?: string }>(`
    UPDATE users SET name = :name, updated_at = CURRENT_TIMESTAMP 
    WHERE id = :id
  `),

  delete: db.prepare<{ id: number }>(`
    DELETE FROM users WHERE id = :id
  `),
};

// model to interact with
const UserModel = {
  create(username: string, name: string) {
    const info = stmts.insert.run({
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
    const res = stmts.getAll.all() as UserRow[];
    const allUsers = res.map(user => mapUser(user));
    return allUsers;
  },

  getById(id: number) {
    const res = stmts.findById.get({ id }) as UserRow;
    const user = mapUser(res);
    return user;
  },

  update(id: number, name: string) {
    stmts.update.run({ id, name });
    return this.getById(id);
  },

  delete(id: number) {
    stmts.delete.run({ id });
  },
};

export type { User };

export { UserModel };
