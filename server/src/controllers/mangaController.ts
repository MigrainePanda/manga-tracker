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

export const getMangaCoverImage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const manga = MangaModel.getCoverImage(id);
    if (!manga) {
      res.status(404).json({ message: 'Cover images not found' });
      return;
    }
    res.set('Content-Type', manga.mime_type || 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(manga.cover_image);
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
    const {
      idMal,
      titles,
      type,
      format,
      status,
      chapters,
      volumes,
      genres,
      cover_image,
      mime_type,
    } = req.body;
    const mangaEntry = MangaModel.create({
      idMal: Number(idMal),
      titles: Array.isArray(titles) ? titles : JSON.parse(titles),
      type,
      format,
      status,
      chapters: chapters ? Number(chapters) : null,
      volumes: volumes ? Number(volumes) : null,
      genres: Array.isArray(genres) ? genres : JSON.parse(genres),
      cover_image: Buffer.from(cover_image),
      mime_type,
    });
    res.status(201).json(mangaEntry);
  } catch (error) {
    next(error);
  }
};
