const addUniqueId = (movies) => (req, res, next) => {
  movies
    .sort((movie1, movie2) => +movie1.year - +movie2.year)
    .map((movie, index) => (movie.id = index + 1));

  console.log(movies.slice(0, 5));

  next();
};

const searchResult = (parsedMovieData) => (req, res) => {
  const { keyword } = req.query;
  const searchedMovies = parsedMovieData.filter(({ name }) => {
    return new RegExp(keyword, 'i').test(name);
  });

  res.json(result);
};

const allMovies = (parsedMovieData) => (req, res) => {
  res.json(parsedMovieData);
};

const sendRequestedCountResult = (parsedMovieData) => (req, res) => {
  const count = req.params.count;
  const result = parsedMovieData.slice(0, count);
  res.json(result);
};

const homePage = (req, res) => {
  res.sendFile('index.html', { root: './public' });
};

module.exports = {
  searchResult,
  sendRequestedCountResult,
  allMovies,
  homePage,
  addUniqueId,
};
