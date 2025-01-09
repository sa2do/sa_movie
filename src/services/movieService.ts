import axios from 'axios';


require('dotenv').config();
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export const fetchMoviesWithEditors = async (year: number) => {
    const moviesUrl = `${TMDB_BASE_URL}/discover/movie?language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`;

    try {
        const movieResponse = await axios.get(moviesUrl, {
            headers: { Authorization: `Bearer ${API_KEY}`,Accept: 'application/json', },
             
        });
        //const movies = movieResponse.data.results;

        const movies = movieResponse.data.results.sort((a: any, b: any) => b.vote_average - a.vote_average);
        const detailedMovies = await Promise.all(
            movies.map(async (movie: any) => {
                try {
                    const creditsResponse = await axios.get(
                        `${TMDB_BASE_URL}/movie/${movie.id}/credits`,
                        {
                            headers: { Authorization: `Bearer ${API_KEY}` },
                        }
                    );

                    const editors = creditsResponse.data.crew
                        .filter((member: any) => member.known_for_department === 'Editing')
                        .map((editor: any) => editor.name);

                    return {
                        title: movie.title,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                        editors,
                    };
                } catch {
                    return {
                        title: movie.title,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                        editors: [],
                    };
                }
            })
        );
        
        return detailedMovies;
    } catch (error) {
        throw new Error('Failed to fetch movies.');
    }
};