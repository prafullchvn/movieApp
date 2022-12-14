const express = require('express');
const morgan = require('morgan');
const {
  sendRequestedCountResult,
  searchResult,
  allMovies,
  homePage,
  addUniqueId,
} = require('./handler/movie');

const createApp = (parsedMovieData) => {
  const app = express();

  app.use(morgan('tiny'));

  app.use((_, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use(addUniqueId(parsedMovieData));

  app.get('/', homePage);

  app.get('/all', allMovies(parsedMovieData));
  app.get('/count/:count', sendRequestedCountResult(parsedMovieData));
  app.get('/search', searchResult(parsedMovieData));

  app.use(express.static(process.env.ROOT));

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found.' });
  });
  return app;
};

module.exports = { createApp };
