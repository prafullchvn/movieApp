const API = {
  loadMovies: (count) => fetch(`/count/${count}`),
  searchMovies: (keyword) => fetch(`/search?keyword=${keyword}`),
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
      toBeLoaded: 10,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState({ toBeLoaded: this.state.toBeLoaded + 10 });
    this.loadMovies();
  }

  loadMovies() {
    API.loadMovies(this.state.toBeLoaded)
      .then((res) => res.json())
      .then((movies) => {
        this.setState({
          movies,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ message: err.message });
      });
  }

  handleSearch(event) {
    const keyword = event.target.value;

    if (keyword.trim() === '') {
      return this.loadMovies();
    }

    API.searchMovies(keyword)
      .then((res) => res.json())
      .then((results) => {
        this.setState(() => {
          return {
            movies: results,
          };
        });
      });
  }

  componentDidMount() {
    this.loadMovies();
  }

  render() {
    const movies = this.state.movies.map((movie, index) =>
      React.createElement(MovieDetails, { ...movie, key: index })
    );
    return this.state.loading
      ? React.createElement('p', null, this.state.message)
      : React.createElement(
          'div',
          { className: 'search-results' },
          React.createElement('input', {
            type: 'text',
            id: 'search',
            onChange: this.handleSearch,
            placeholder: 'Search',
          }),
          React.createElement('div', { className: 'movies' }, movies),
          React.createElement(
            'button',
            { onClick: this.loadMore, className: 'load-more-btn' },
            'Load More'
          )
        );
  }
}

const rootElement = document.querySelector('#root');
const root = ReactDOM.createRoot(rootElement);
const title = React.createElement('h1', { className: 'header' }, 'Movie Time');
const movies = React.createElement(Movies);
const container = React.createElement('div', null, title, movies);

root.render(container);
