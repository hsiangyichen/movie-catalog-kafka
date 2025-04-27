import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "movie-catalog-service",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();

export async function connectKafka() {
  try {
    await producer.connect();
    console.log("Connected to Kafka.");
  } catch (error) {
    console.error("Kafka connection error:", error);
  }
}

export default kafka;
