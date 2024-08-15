import Queue from "bull";
import { REDIS_PORT, REDIS_URI } from "../config/redisConfig";

// Common Redis configuration
const redisConfig = {
  port: REDIS_PORT,
  host: REDIS_URI,
};

// Factory function to create a queue
const createQueue = (name: string) => {
  return new Queue(name, { redis: redisConfig });
};

// Create and export the queues
export const emailQueue = createQueue("emailQueue");
export const highPriorityEmailQueue = createQueue("highPriorityEmailQueue");
export const deadLetterQueues = createQueue("deadLetterQueues");
