import dotenv from 'dotenv';
const redis = require('redis');
dotenv.config();

const client = redis.createClient({ url: process.env.REDIS_HOST_URL });

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('::> ✅ Redis Client Connected'));
client.on('error', (err:any) => console.log('<:: Redis Client Error', err));

module.exports = client;