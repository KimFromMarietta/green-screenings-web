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


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: null
    }

    // bindings
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentWillMount() {
    this.fetchMovies();
  }

  fetchMovies() {
    axios.get('/api/movies').then((res) => {
      this.setState({
        movies: res.data
      });
    });
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: teal,
        secondary: purple,
        error: pink
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App column items-center">
          <AppBar position="static" color="primary">
            <Toolbar>
              <h3>Green Screenings</h3>
              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
          {!this.state.movies ? <LinearProgress color="secondary" /> :
            <div className="column flex-80 lt-sm-flex-90  gt-xl-flex-50">
              <MovieList movies={this.state.movies} update={this.fetchMovies} />
            </div>}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
