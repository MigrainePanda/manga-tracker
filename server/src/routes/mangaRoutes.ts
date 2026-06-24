import { Router } from 'express';
import {
  getAllManga,
  getMangaCoverImage,
  getMangaByID,
  createMangaEntry,
  updateCollection,
  deleteMangaEntry,
} from '../controllers/mangaController.ts';

const router = Router();

router.get('/', getAllManga);
router.get('/cover-images/:id', getMangaCoverImage);
router.get('/:id', getMangaByID);
router.post('/', createMangaEntry);
router.put('/:id/collection', updateCollection);
router.delete('/:id', deleteMangaEntry);

export default router;
