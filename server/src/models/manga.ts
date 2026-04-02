import db from '../database/db.js';

interface MangaType extends MangaNonDate {
  created_at: Date;
  updated_at: Date;
}

interface MangaNonDate {
  id: number;
  title: string;
}

interface MangaDBRow extends MangaNonDate {
  created_at: string;
  updated_at: string;
}

const DB_NAME = 'manga';
const stmts = {
  findById: db.prepare<{ id: number }>(`
    SELECT * FROM ${DB_NAME} WHERE id = :id
  `),

  getAll: db.prepare(`SELECT * FROM ${DB_NAME} ORDER BY created_at ASC`),
};

// model to interact with
const MangaModel = {
  getById(id: number): MangaType | null {
    const dbRow = stmts.findById.get({ id }) as MangaDBRow | undefined;
    if (!dbRow) {
      return null;
    }
    const manga: MangaType = {
      ...dbRow,
      created_at: new Date(dbRow.created_at),
      updated_at: new Date(dbRow.updated_at),
    };
    return manga;
  },

  getAll(): MangaType[] | null {
    const dbRows = stmts.getAll.all() as MangaDBRow[] | undefined;
    if (!dbRows) {
      return null;
    }
    const manga: MangaType[] = dbRows.map(function (dbRow: MangaDBRow) {
      return {
        ...dbRow,
        created_at: new Date(dbRow.created_at),
        updated_at: new Date(dbRow.updated_at),
      };
    });
    return manga;
  },
};

export type { MangaType };

export { MangaModel };
