import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
