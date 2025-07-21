const BASE_URL="https://api.themoviedb.org/3"

export const getPopularMovies = async (req, res) => {
    try {
        // Fetch multiple pages (e.g., first 5 pages = 100 movies)
        const pagesToFetch = [1, 2, 3, 4, 5]; // Adjust as needed
        const allMovies = [];

        for (const page of pagesToFetch) {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${import.meta.env.API_KEY}&page=${page}`
        );
        const data = await response.json();
        allMovies.push(...data.results); // Merge results
        }

        return allMovies; // Now contains 100+ movies
    } catch (error) {
        console.log(error);
        return []; // Return empty array if error
    }
};
export const searchMovies = async (query) => {
    try {
        const pagesToFetch = [1, 2, 3,4,5]; // Fetch 3 pages (60 movies)
        const allMovies = [];

        for (const page of pagesToFetch) {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${import.meta.env.API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await response.json();
        allMovies.push(...data.results);
        }

        return allMovies;
    } catch (error) {
        console.log(error);
        return [];
    }
};