const redis = require('redis');

/**
 * Class representing a client for interacting with Redis
 */
class RedisClient {
  /**
   * Creates a Redis client and attaches an error listener
   */
  constructor() {
    this.client = redis.createClient();

    /**
     * Logs any errors encountered by the Redis client
     * @param {Error} err - The error object from the Redis client
     */
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  }

  /**
   * Checks if the Redis client is currently connected
   * @returns {boolean} True if connected, False otherwise
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Asynchronously retrieves a value from Redis for the given key
   * @param {string} key - The key to retrieve the value for
   * @returns {Promise<string|null>} - The retrieved value or null if not found/error
   */
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error('Error getting value from Redis:', error);
      return null;
    }
  }

  /**
   * Asynchronously stores a key-value pair in Redis with an expiration time
   * @param {string} key - The key for the data
   * @param {string} value - The value to store
   * @param {number} duration - The expiration time in seconds
   * @returns {Promise<void>} - Resolves after setting the value (no return value)
   */
  async set(key, value, duration) {
    try {
      await this.client.set(key, value, 'EX', duration);
    } catch (error) {
      console.error('Error setting value in Redis:', error);
    }
  }

  /**
   * Asynchronously removes a key and its associated value from Redis
   * @param {string} key - The key to delete
   * @returns {Promise<void>} - Resolves after deleting the key (no return value)
   */
  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Error deleting key from Redis:', error);
    }
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;

