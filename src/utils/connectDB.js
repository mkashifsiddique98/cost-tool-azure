import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedDb

export default async function connectDB() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(MONGODB_URI);

  console.log('Connected to MongoDB');

  cachedDb = db.connections[0];
  return cachedDb;
}
