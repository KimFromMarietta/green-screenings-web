import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withTheme } from 'material-ui/styles';

import './movie-list.css';
import MovieForm from '../movie-form';
import NumberView from '../number-view';

class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addNew: false,
            movies: this.props.movies
        }

        this.addCancel = this.addCancel.bind(this);
        this.addMovie = this.addMovie.bind(this);
    }

    static propTypes = {
        movies: PropTypes.array.isRequired
    }

    addCancel() {
        this.setState({
            addNew: !this.state.addNew
        });
    }

    addMovie(movie) {
        const updatedMovies = [...this.state.movies, movie];
        this.setState({movies: updatedMovies});
        this.addCancel();
    }

    render() {
        const theme = this.props.theme;

        // console.debug('palette', theme.palette);

        const highlightStyle = {color: theme.palette.secondary['800']};

        const sortedMovies = [...this.state.movies].sort((a, b) => {
            return b.rating - a.rating;
        });

        const movieRows = sortedMovies.map((movie, i) => {
            return (
                <div className={`wr-card row items-center flex-80 lt-sm-flex-90 ${i % 2 === 1 ? 'odd' : ''}`}>
                    <div className="flex-10 txt-c"><Button style={{marginLeft: "-20px"}} variant="fab" mini color="primary">{i+1}</Button></div>
                    <h2 className="flex-45 lt-md-flex-75">{movie.title}</h2>
                    <h2 className="txt-c flex-15" style={highlightStyle}>
                        {<NumberView value={movie.rating} decimalPlaces={2} /> || '-'}
                    </h2>
                    <p className="txt-c flex-5 lt-md-hide">{movie.storyRating || '-'}</p>
                    <p className="txt-c flex-5 lt-md-hide">{movie.characterRating || '-'}</p>
                    <p className="txt-c flex-5 lt-md-hide">{movie.performanceRating || '-'}</p>
                    <p className="txt-c flex-5 lt-md-hide">{movie.visualRating || '-'}</p>
                    <p className="txt-c flex-5 lt-md-hide">{movie.soundRating || '-'}</p>
                </div>
            )
        });

        return (
            <div className="movie-list column items-center flex-100">
                <div className={`row items-center flex-80 lt-sm-flex-90`}
                style={{marginBottom: "-15px"}}>
                    <div className="txt-c flex-10"><Button style={{marginLeft: "-20px"}} color="primary" onClick={this.addCancel}>
                        <i className="material-icons">{this.state.addNew ? 'cancel' : 'add'}</i>
                    </Button></div>
                    <h4 className="txt-c flex-45 lt-md-flex-75">Title</h4>
                    <h4 className="txt-c flex-15">Rating</h4>
                    <h4 className="txt-c flex-5 lt-md-hide">Story</h4>
                    <h4 className="txt-c flex-5 lt-md-hide">Char</h4>
                    <h4 className="txt-c flex-5 lt-md-hide">Perf</h4>
                    <h4 className="txt-c flex-5 lt-md-hide">Vis</h4>
                    <h4 className="txt-c flex-5 lt-md-hide">Sound</h4>
                </div>
                {this.state.addNew ? <MovieForm cancel={this.addCancel} submit={this.addMovie} /> : null}
                {movieRows}
            </div>
        )
    }

}

export default withTheme()(MovieList);
