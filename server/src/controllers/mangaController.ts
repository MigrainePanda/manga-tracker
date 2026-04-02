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
