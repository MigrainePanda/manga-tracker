import config from '../config/config';
import { AnilistSearchResultType } from '@shared/types';

const receivedData = `
  idMal
  title {
    romaji
    english
    native
  }
  type
  format
  status
  chapters
  volumes
  genres
  coverImage {
    medium
  }
`;

const fetchAnilistData = async (query: string, variables: object) => {
  const url = config.ANILIST_API_URL;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  const media: AnilistSearchResultType[] = data.data.Page.media;
  const res = media.map((entry: AnilistSearchResultType) => {
    return {
      ...entry,
      cover_image: entry.coverImage.medium,
    };
  });
  return res;
};

const fetchAnilistDataBySearchString = async (
  search: string,
  perPage?: number,
) => {
  const query = `
    query ($page: Int, $perPage: Int, $search: String, $type: MediaType, $format: MediaFormat) {
        Page (page: $page, perPage: $perPage) {
            media (search: $search, type: $type, format: $format) {
                ${receivedData}
            }
        }
    }
  `;

  const variables = {
    search: search,
    page: 1,
    perPage: perPage || 20,
    type: 'MANGA',
    format: 'MANGA',
  };

  return await fetchAnilistData(query, variables);
};

const fetchAnilistDataByGenre = async (genre: string, perPage?: number) => {
  const query = `
    query ($page: Int, $perPage: Int, $genre: String, $type: MediaType, $format: MediaFormat) {
        Page (page: $page, perPage: $perPage) {
            media (genre: $genre, type: $type, format: $format) {
                ${receivedData}
            }
        }
    }
  `;

  const variables = {
    genre: genre,
    page: 1,
    perPage: perPage || 20,
    type: 'MANGA',
    format: 'MANGA',
  };

  return await fetchAnilistData(query, variables);
};

export { fetchAnilistDataBySearchString, fetchAnilistDataByGenre };
