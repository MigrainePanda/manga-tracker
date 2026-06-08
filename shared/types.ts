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
  coverImage: {
    medium: string;
    large: string;
  };
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
  owned_volumes: Record<number, number>;
  genres: string[];
  cover_image: Buffer;
  mime_type: string;
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
