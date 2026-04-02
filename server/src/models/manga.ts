import { getDb } from '../database/db';

interface MangaType extends MangaNonDate {
  created_at: Date;
  updated_at: Date;
}

interface MangaNonDate {
  id: number;
  idMal: number;
  titles: string[];
  type: string;
  format: string;
  status: string;
  chapters: number | null;
  volumes: number | null;
  genres: string[];
}

interface MangaDBRow extends MangaNonDate {
  created_at: string;
  updated_at: string;
}

const mapDBRowToType = (dbRow: MangaDBRow): MangaType => {
  return {
    ...dbRow,
    created_at: new Date(dbRow.created_at),
    updated_at: new Date(dbRow.updated_at),
  };
};

const DB_NAME = 'manga';

// model to interact with
const MangaModel = {
  getAll(): MangaType[] | null {
    const db = getDb();
    const dbRows = db
      .prepare(`SELECT * FROM ${DB_NAME} ORDER BY created_at ASC`)
      .all() as MangaDBRow[] | undefined;
    if (!dbRows) {
      return null;
    }
    const manga: MangaType[] = dbRows.map((dbRow: MangaDBRow) =>
      mapDBRowToType(dbRow),
    );
    return manga;
  },

  getById(id: number): MangaType | null {
    const db = getDb();
    const dbRow = db
      .prepare<{ id: number }>(`SELECT * FROM ${DB_NAME} WHERE id = :id`)
      .get({ id }) as MangaDBRow | undefined;
    if (!dbRow) {
      return null;
    }
    const manga: MangaType = mapDBRowToType(dbRow);
    return manga;
  },

  create(
    idMal: number,
    titles: string[],
    type: string,
    format: string,
    status: string,
    chapters: number | null,
    volumes: number | null,
    genres: string[],
  ) {
    const db = getDb();
    const query = `INSERT INTO ${DB_NAME} (
      idMal, 
      titles, 
      type, 
      format, 
      status, 
      chapters, 
      volumes, 
      genres
    ) VALUES (
      :idMal, 
      :titles, 
      :type, 
      :format, 
      :status, 
      :chapters, 
      :volumes, 
      :genres
    )`;
    const stmt = db.prepare<{
      idMal: number;
      titles: string[];
      type: string;
      format: string;
      status: string;
      chapters: number | null;
      volumes: number | null;
      genres: string[];
    }>(query);
    const info = stmt.run({
      idMal,
      titles,
      type,
      format,
      status,
      chapters,
      volumes,
      genres,
    });
    console.log(info);
  },
};

export type { MangaType };

export { MangaModel };
