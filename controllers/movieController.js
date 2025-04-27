import { getAllMovies, addMovie } from "../services/movieService.js";
import { producer } from "../services/kafkaClient.js";

/* ------------------- GET request to retrieve all movies ------------------- */
export async function getMovies(req, res) {
  try {
    const movies = await getAllMovies();
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error getting movies:", error);
    return res.status(500).json({ message: "Server error retrieving movies." });
  }
}

/* ------------------- POST request to create a new movie ------------------- */
export async function createMovie(req, res) {
  const { title, rating } = req.body;

  if (!title || !rating) {
    return res.status(400).json({ message: "Title and rating are required" });
  }

  try {
    const newMovie = await addMovie({ title, rating });

    // Publish a message to Kafka
    await producer.send({
      topic: "movie-created",
      messages: [
        {
          value: JSON.stringify(newMovie.title),
        },
      ],
    });

    return res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    return res.status(500).json({ message: "Server error creating movie." });
  }
}
