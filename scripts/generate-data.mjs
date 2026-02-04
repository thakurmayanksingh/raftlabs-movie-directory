import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const API_TOKEN = process.env.TMDB_TOKEN;

if (!API_TOKEN) {
  console.error('Error: TMDB_TOKEN is missing in .env.local');
  process.exit(1);
}

// Map genre IDs to names (TMDB returns IDs by default)
const fetchGenres = async () => {
  const response = await fetch(`${TMDB_API_BASE}/genre/movie/list?language=en-US`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
    },
  });
  const data = await response.json();
  // Create a simple map: { 28: 'Action', 12: 'Adventure', ... }
  return data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});
};

async function fetchTopMovies() {
  console.log('🎬 Starting data fetch...');
  const allMovies = [];
  const genreMap = await fetchGenres();

  // Fetch 13 pages to ensure we get > 250 movies (20 per page * 13 = 260)
  const totalPages = 13; 

  for (let page = 1; page <= totalPages; page++) {
    console.log(`   Fetching page ${page} of ${totalPages}...`);
    const response = await fetch(
      `${TMDB_API_BASE}/movie/top_rated?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json',
        },
      }
    );
    const data = await response.json();
    
    if (data.results) {
      // Format the data cleanly for our app
      const formattedMovies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        rating: movie.vote_average,
        vote_count: movie.vote_count,
        poster_path: movie.poster_path, // We will construct full URL in the component
        backdrop_path: movie.backdrop_path,
        genres: movie.genre_ids.map((id) => genreMap[id] || 'Unknown'),
      }));
      allMovies.push(...formattedMovies);
    }
  }

  // Define output path: src/data/movies.json
  const outputPath = path.join(process.cwd(), 'src', 'data', 'movies.json');
  
  // Ensure directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Write file
  fs.writeFileSync(outputPath, JSON.stringify(allMovies, null, 2));
  console.log(`✅ Success! ${allMovies.length} movies saved to src/data/movies.json`);
}

fetchTopMovies();