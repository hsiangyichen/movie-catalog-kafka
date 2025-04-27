import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

const MOVIES_FILE = "./data/movies.json";

/* ---------------------- Read all movies from the file --------------------- */
export async function getAllMovies() {
  try {
    const data = await fs.readFile(MOVIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading movies file:", error);
    return [];
  }
}

/* ---------------------- Write a new movie to the file --------------------- */
export async function addMovie(movieData) {
  try {
    const movies = await getAllMovies();

    const newMovie = {
      id: uuidv4(),
      ...movieData,
    };

    movies.push(newMovie);

    await fs.writeFile(MOVIES_FILE, JSON.stringify(movies, null, 2));

    return newMovie;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
}
