import express from 'express';
import { getMovies } from '../controllers/movieController';

const router = express.Router();

router.get('/:year', getMovies);

export default router;