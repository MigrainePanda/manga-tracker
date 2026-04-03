import { Request, Response, NextFunction } from 'express';
import { fetchAnilistDataBySearchString } from '../services/anilist';

// get all manga
export const search = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { searchStr, perPage } = req.query;
    const data = await fetchAnilistDataBySearchString(
      searchStr as string,
      parseInt(perPage as string, 10),
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
