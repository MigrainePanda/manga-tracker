import { Router } from 'express';
import {
  getAllManga,
  getMangaByID,
  // createItem,
  // updateItem,
  // deleteItem,
} from '../controllers/mangaController.ts';

const router = Router();

router.get('/', getAllManga);
router.get('/:id', getMangaByID);
// router.post('/', createItem);
// router.put('/:id', updateItem);
// router.delete('/:id', deleteItem);

export default router;
