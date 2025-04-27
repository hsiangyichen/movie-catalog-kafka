import express from "express";
import movieRoute from "./routes/movieRoutes.js";

const app = express();
const PORT = 8080;

app.use(express.json());

// Movie routes
app.use("/movies", movieRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Movie Catalog Service!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
