import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import purple from 'material-ui/colors/purple';
import pink from 'material-ui/colors/pink';

import MovieList from './comp/movie-list/movie-list';


class App extends Component {

  movies = [{ "characterRating": 4, "director": "Clint Eastwood", "directorId": 16, "genre": "drama", "id": 16, "performanceRating": 3, "rating": 3.5, "releaseDate": new Date(1518152400000), "soundRating": 5, "storyRating": 2, "title": "15:17 to Paris", "visualRating": 5 }, { "characterRating": 9, "director": "Ryan Coogler", "directorId": 4, "genre": "action", "id": 4, "performanceRating": 8, "rating": 9.17, "releaseDate": new Date(1518757200000), "soundRating": 9, "storyRating": 10, "title": "Black Panther", "visualRating": 9 }, { "characterRating": 8, "director": "John Daley", "directorId": 7, "genre": "comedy", "id": 7, "performanceRating": 8, "rating": 7.83, "releaseDate": new Date(1519362000000), "soundRating": 6, "storyRating": 9, "title": "Game Night", "visualRating": 7 }, { "characterRating": 6, "director": "Ava DuVernay", "directorId": 10, "genre": "scifi", "id": 10, "performanceRating": 7, "rating": 6.33, "releaseDate": new Date(1519621200000), "soundRating": 8, "storyRating": 5, "title": "A Wrinkle in Time", "visualRating": 9 }, { "characterRating": 3, "director": "Roar Uthaug", "directorId": 13, "genre": "action", "id": 13, "performanceRating": 3, "rating": 3.67, "releaseDate": new Date(1521172800000), "soundRating": 4, "storyRating": 4, "title": "Tomb Raider", "visualRating": 4 }];

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
        <div className="App">
          <AppBar position="static" color="primary">
            <Toolbar>
              <h3>Green Screenings</h3>
              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
          <MovieList movies={this.movies} />
        </div>
      </MuiThemeProvider>
        );
      }
    }
    
    export default App;
