const API = {
  loadMovies: (count) => fetch(`/count/${count}`),
  searchMovies: (keyword) => fetch(`/search?keyword=${keyword}`),
  allMovies: () => fetch(`/all`),
};

const formatKeyword = (keyword) => {
  return keyword.trim().toLowerCase();
};

const MovieDetails = ({ name, year }) => {
  const nameElement = React.createElement('h2', null, name);
  const yearElement = React.createElement('p', null, year);

  return React.createElement(
    'div',
    { className: 'movie-card' },
    nameElement,
    yearElement
  );
};

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'loading',
      loading: true,
      movies: [],
      filteredMovies: [],
      toBeLoaded: 10,
    };

    this.filterMovies = this.filterMovies.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState({ toBeLoaded: this.state.toBeLoaded + 10 });
  }

  loadMovies() {
    API.allMovies()
      .then((res) => res.json())
      .then((movies) => {
        this.setState({
          movies,
          filteredMovies: movies,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ message: err.message });
      });
  }

  filterMovies(event) {
    const keyword = formatKeyword(event.target.value);

    const filteredMovies = this.state.movies.filter(({ name }) => {
      const lowerCaseName = name.toLowerCase();
      return lowerCaseName.includes(keyword);
    });

    this.setState(() => ({ filteredMovies }));
  }

  componentDidMount() {
    this.loadMovies();
  }

  render() {
    const movies = this.state.filteredMovies
      .slice(0, this.state.toBeLoaded)
      .map(({ id, name, year }, index) =>
        React.createElement(MovieDetails, { name, year, key: id })
      );

    const input = React.createElement('input', {
      id: 'search',
      onChange: this.filterMovies,
      placeholder: 'Search',
    });

    const loadMore = React.createElement(
      'button',
      { onClick: this.loadMore, className: 'load-more-btn' },
      'Load More'
    );

    const message = React.createElement(
      'p',
      { className: 'message' },
      this.state.message
    );

    return this.state.loading
      ? message
      : React.createElement(
          'div',
          { className: 'search-results' },
          input,
          React.createElement('div', { className: 'movies' }, movies),
          loadMore
        );
  }
}

const rootElement = document.querySelector('#root');
const root = ReactDOM.createRoot(rootElement);
const title = React.createElement('h1', { className: 'header' }, 'Movie Time');
const movies = React.createElement(Movies);
const container = React.createElement('div', null, title, movies);

root.render(container);
