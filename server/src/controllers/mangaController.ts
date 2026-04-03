import { Request, Response, NextFunction } from 'express';
import { MangaModel } from '../models/manga';

// get all manga
export const getAllManga = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const manga = MangaModel.getAll();
    if (!manga) {
      res.status(404).json({ message: 'Manga not found' });
      return;
    }
    res.status(200).json(manga);
  } catch (error) {
    next(error);
  }
};

// get manga by ID
export const getMangaByID = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const manga = MangaModel.getById(id);
    if (!manga) {
      res.status(404).json({ message: 'Manga not found' });
      return;
    }
    res.status(200).json(manga);
  } catch (error) {
    next(error);
  }
};

// create manga entry
export const createMangaEntry = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { idMal, titles, type, format, status, chapters, volumes, genres } =
      req.body;
    const mangaEntry = MangaModel.create({
      idMal: Number(idMal),
      titles: Array.isArray(titles) ? titles : JSON.parse(titles),
      type,
      format,
      status,
      chapters: chapters ? Number(chapters) : null,
      volumes: volumes ? Number(volumes) : null,
      genres: Array.isArray(genres) ? genres : JSON.parse(genres),
    });
    res.status(201).json(mangaEntry);
  } catch (error) {
    next(error);
  }
};
