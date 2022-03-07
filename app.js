const path = require('path');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

const app = express();

// Middlewares
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandler);

module.exports = app;
