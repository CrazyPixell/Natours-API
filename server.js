const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  console.log('Uncaught exception! Shutting down... See the logs.');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message, 'Double check your code');
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// eslint-disable-next-line no-console
mongoose.connect(db).then(() => console.log('Database connection established'));

const port = process.env.PORT || 3000;
const server = app.listen(port);

process.on('unhandledRejection', err => {
  // eslint-disable-next-line no-console
  console.log(err.name, err.message, 'Try to check DB credentials');
  // eslint-disable-next-line no-console
  console.log('Unhandled rejection! Shutting server down... See the logs.');
  server.close(() => process.exit(1));
});
