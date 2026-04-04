export interface APIResponseType {
  data: object[] | unknown;
  error: boolean;
  status: number;
  message: string;
}

export interface AnilistSearchResultType {
  id: number;
  idMal: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  type: string;
  format: string;
  status: string;
  chapters: number | null;
  volumes: number | null;
  genres: string[];
}

export interface MangaType extends MangaNonDate {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface MangaNonDate {
  idMal: number;
  titles: string[];
  type: string;
  format: string;
  status: string;
  chapters: number | null;
  volumes: number | null;
  genres: string[];
}

export interface MangaDBRow extends MangaNonDate {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface UserType {
  id: number;
  username: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

// result directly from table
export interface UserDBRow {
  id: number;
  username: string;
  name: string;
  created_at: string;
  updated_at: string;
}
