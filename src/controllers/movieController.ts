import { NextFunction, Request, Response } from 'express';
import { fetchMoviesWithEditors } from '../services/movieService';



export const getMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const { year } = req.params;
    if (!year || !/^\d{4}$/.test(year)) {
        res.status(400).json({ error: 'Invalid year format. Use YYYY.' });
    }
    
        const movies = await fetchMoviesWithEditors(parseInt(year));
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies.' });
    }
};