import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(50, "1d"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});