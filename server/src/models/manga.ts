import { getDb } from '../database/db';
import { MangaType, MangaDBRow, MangaNonDate } from '@shared/types';

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
      .prepare(
        `SELECT id, idMal, titles, type, format, status, chapters, volumes, owned_volumes, genres FROM ${DB_NAME} ORDER BY created_at ASC`,
      )
      .all() as MangaDBRow[] | undefined;
    if (!dbRows) {
      return null;
    }
    const manga: MangaType[] = dbRows.map((dbRow: MangaDBRow) =>
      mapDBRowToType(dbRow),
    );
    return manga;
  },

  getCoverImage(id: number): {
    cover_image: Buffer;
    mime_type: string;
  } | null {
    const db = getDb();
    const row = db
      .prepare('SELECT cover_image, mime_type FROM manga WHERE id = :id')
      .get({ id }) as {
      cover_image: Buffer;
      mime_type: string;
    } | null;
    if (!row) {
      return null;
    }
    return row;
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

  getByMALId(idMal: number): MangaType | null {
    const db = getDb();
    const dbRow = db
      .prepare<{
        idMal: number;
      }>(`SELECT * FROM ${DB_NAME} WHERE idMal = :idMal`)
      .get({ idMal }) as MangaDBRow | undefined;
    if (!dbRow) {
      return null;
    }
    const manga: MangaType = mapDBRowToType(dbRow);
    return manga;
  },

  create(data: MangaNonDate) {
    const db = getDb();
    const query = `INSERT INTO ${DB_NAME} (idMal, titles, type, format, status, chapters, volumes, owned_volumes, genres, cover_image, mime_type) 
                   VALUES (:idMal, :titles, :type, :format, :status, :chapters, :volumes, :owned_volumes, :genres, :cover_image, :mime_type)`;
    const stmt = db.prepare(query);
    const info = stmt.run({
      ...data,
      titles: JSON.stringify(data.titles),
      genres: JSON.stringify(data.genres),
      owned_volumes: JSON.stringify(data.owned_volumes),
    });
    console.log(info);
  },

  delete(id: number): object {
    const db = getDb();
    const stmt = db.prepare<{ id: number }>('DELETE FROM manga where id = :id');
    const res = stmt.run({ id });
    return res;
  },

  updateCollection(id: number, new_owned_volumes: object): object {
    const db = getDb();
    const stmt = db.prepare(
      'UPDATE manga SET owned_volumes = :new_owned_volumes where id = :id',
    );
    const res = stmt.run({
      id,
      new_owned_volumes: JSON.stringify(new_owned_volumes),
    });
    return res;
  },
};

export type { MangaType };

export { MangaModel };
