const papaparse = require('papaparse');
const fs = require('fs');

require('dotenv').config();

const { createApp } = require('./src/app.js');

const index = () => {
  const movieFilePath = process.env.MOVIES_FILE;
  const movieData = fs.readFileSync(movieFilePath, 'utf8');
  const parsedMovieData = papaparse.parse(movieData, {
    delimiter: '|',
    header: true,
  });

  const app = createApp(parsedMovieData.data);

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}, http://localhost:${PORT}`);
  });
};

index();
