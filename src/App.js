import React, { Component } from 'react';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';

import MovieList from './comp/movie-list/movie-list';
import Filters from './comp/filters';
import Button from '@material-ui/core/Button';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      tags: null,
      years: null,
      drawer: false
    }

    // bindings
    this.fetchMovies = this.fetchMovies.bind(this);
    this.getFilters = this.getFilters.bind(this);
    this.getYears = this.getYears.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.updateYear = this.updateYear.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
    this.getFilters();
    this.getYears();
  }

  fetchMovies() {
    axios.get('/api/ratings').then((res) => {
      this.setState({
        movies: res.data
      });
    });
  }

  getFilters() {
    axios.get('/api/ratings/tags').then(res => {
      let tags = res.data;
      tags.unshift('All');
      this.setState({
        tags: tags
      })
    })
  }

  getYears() {
    axios.get('/api/ratings/years').then(res => {
      let years = res.data;
      years.unshift('All');
      this.setState({
        years: years,
        yearFilter: years[1] ? years[1] : years[0]
      })
    })
  }

  filterMovies() {
    if (!this.state.movies) return [];
    let res = [...this.state.movies];
    
    if (this.state.tagFilter) {
      res = res.filter(mov => {
        return mov.tags && mov.tags.includes(this.state.tagFilter);
      });
    }

    if (this.state.yearFilter) {
      res = res.filter(mov => {
        return mov.year && ("" + mov.year) === this.state.yearFilter;
      });
    }

    return res;
  }

  updateFilter(filter) {
    this.setState({ tagFilter: filter });
  }

  updateYear(filter) {
    this.setState({ yearFilter: filter });
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
          <Drawer variant="persistent" open={this.state.drawer}>
            <div className="column fixed-300">
              <Toolbar>
                <Button onClick={this.toggle}><i className="material-icons">chevron_left</i></Button>
              </Toolbar>
              {this.state.years ? <Filters tags={this.state.years} tagFilter={this.state.yearFilter} update={this.updateYear} title="Release Year" /> : null}
              {this.state.tags ? <Filters tags={this.state.tags} update={this.updateFilter} title="Tags" /> : null}
            </div>
          </Drawer>
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