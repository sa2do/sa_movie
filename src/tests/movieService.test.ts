import axios from 'axios';
import { fetchMoviesWithEditors } from '../services/movieService';

jest.mock('axios');

describe('Movie Service', () => {
    it('should fetch movies with editors', async () => {
        // Mock API responses for movies and credits
        const mockMovieData = { data: { results: [{ id: 1, title: 'Joker', release_date: '2019-01-01', vote_average: 8.19 }] } };
        const mockCreditsData = { data: { crew: [{ known_for_department: 'Editing', name: 'Jeff Groth' }] } };

        (axios.get as jest.Mock)
            .mockResolvedValueOnce(mockMovieData)
            .mockResolvedValueOnce(mockCreditsData);

        const movies = await fetchMoviesWithEditors(2019);

        expect(movies).toEqual([
            {
                title: 'Joker',
                release_date: '2019-01-01',
                vote_average: 8.19,
                editors: ['Jeff Groth'],
            },
        ]);
    });

    it('should handle API errors gracefully', async () => {
        // Mock API error
        (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

        await expect(fetchMoviesWithEditors(2019)).rejects.toThrow('Failed to fetch movies.');
    });
});