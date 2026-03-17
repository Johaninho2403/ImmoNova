import Redis from "ioredis";

const redis = new Redis(String(process.env.REDIS_URL));

export default redis;
