import express from "express";
import movieRoute from "./routes/movieRoutes.js";
import { connectKafka } from "./services/kafkaClient.js";

const app = express();
const PORT = 8080;

app.use(express.json());

// Connect to Kafka producer
connectKafka().catch(console.error);

// Movie routes
app.use("/movies", movieRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Movie Catalog Service!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
