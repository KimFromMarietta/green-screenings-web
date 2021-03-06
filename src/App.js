import React, { Component } from 'react';
import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { LinearProgress } from 'material-ui/Progress';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import purple from 'material-ui/colors/purple';
import pink from 'material-ui/colors/pink';

import MovieList from './comp/movie-list/movie-list';
import Filters from './comp/filters';
import Button from 'material-ui/Button';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      drawer: false
    }

    // bindings
    this.fetchMovies = this.fetchMovies.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies() {
    axios.get('/api/ratings').then((res) => {
      this.setState({
        movies: res.data
      });
    });
  }

  filterMovies() {
    if (!this.state.movies) return [];
    if (!this.state.tagFilter) return this.state.movies;
    const filteredList = this.state.movies.filter(mov => {
      return mov.tags && mov.tags.includes(this.state.tagFilter);
    });

    return filteredList;
  }

  updateFilters(filter) {
    this.setState({tagFilter: filter});
  }

  toggle() {
    this.setState({
      drawer: !this.state.drawer
    })
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: teal,
        secondary: purple,
        error: pink
      }
    });

    const movieList = this.filterMovies();

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App column items-center">
          <Filters open={this.state.drawer} close={this.toggle} update={this.updateFilters} />
          <AppBar position="static" color="primary">
            <Toolbar>
              <Button onClick={this.toggle}>
                <i className="material-icons color-white">menu</i>
              </Button>
              <h3>Green Screenings</h3>
              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
          {!this.state.movies ? <LinearProgress color="secondary" /> :
            <div className="column flex-80 lt-sm-flex-90  gt-xl-flex-50">
              <MovieList movies={movieList} update={this.fetchMovies} />
            </div>}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
