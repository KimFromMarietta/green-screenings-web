import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import axios from 'axios';

import './movie-list.css';
import MovieForm from '../movie-form';
import NumberView from '../number-view';
import { isNumber } from 'util';

class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addNew: false,
            editIndex: null,
            movies: this.props.movies
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            movies: [...nextProps.movies].sort((a, b) => {
                return b.rating - a.rating;
            })
        }
    }

    static propTypes = {
        movies: PropTypes.array.isRequired,
        update: PropTypes.func
    }

    toggleEdit(i) {
        if (isNumber(i)) {
            this.setState({
                editIndex: i
            });
        } else if (isNumber(this.state.editIndex)) {
            this.setState({
                editIndex: null
            });
        } else {
            this.setState({
                addNew: !this.state.addNew
            });
        }
    }

    addMovie(movie) {
        const updatedMovies = [...this.state.movies, movie];
        axios.put('/api/movies', movie).then(this.props.update);
        this.setState({ movies: updatedMovies });
        this.toggleEdit();
    }

    editMovie(movie) {
        const movies = this.state.movies;
        const i = this.state.editIndex;
        axios.put('/api/movies', movie).then(this.props.update);
        this.setState({
            movies: [...movies.slice(0, i), movie, ...movies.slice(i + 1)]
        });
        this.toggleEdit();
    }

    deleteMovie() {
        const movies = this.state.movies;
        const i = this.state.editIndex;
        axios.delete(`/api/movies/${movies[i]._id}`).then(this.props.update);
        this.setState({
            movies: [...movies.slice(0, i), ...movies.slice(i + 1)]
        });
        this.toggleEdit();
    }

    render() {
        const theme = this.props.theme;

        console.debug('list view:', this.props.movies);

        const highlightStyle = { color: theme.palette.secondary['800'] };

        const movieRows = this.state.movies.map((movie, i) => {
            if (this.state.editIndex === i) {
                return <MovieForm key={i} cancel={this.toggleEdit} submit={this.editMovie} delete={this.deleteMovie} movie={movie} />
            }
            return (
                <div key={i} className={`wr-card row items-center flex-100 ${i % 2 === 1 ? 'odd' : ''}`}>
                    <div className="flex-10 txt-c">
                        <Button onClick={() => this.toggleEdit(i)} style={{ marginLeft: "-20px" }} variant="fab" mini color="primary">{i + 1}</Button>
                    </div>
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
                <div className={`row items-center flex-100`}
                    style={{ marginTop: "15px" }}>
                    <div className="txt-c flex-10"><Button style={{ marginLeft: "-20px" }} color="primary" onClick={this.toggleEdit}>
                        <i className="material-icons">{this.state.addNew ? 'cancel' : 'add'}</i>
                    </Button></div>
                    <Typography variant="subheading" color="primary" className="txt-c flex-45 lt-md-flex-75">Title</Typography>
                    <Typography variant="subheading" color="primary" className="txt-c flex-15">Rating</Typography>
                    <Typography variant="subheading" color="primary" className="txt-c flex-5 lt-md-hide">Story</Typography>
                    <Typography variant="subheading" color="primary" className="txt-c flex-5 lt-md-hide">Char</Typography>
                    <Typography variant="subheading" color="primary" className="txt-c flex-5 lt-md-hide">Perf</Typography>
                    <Typography variant="subheading" color="primary" className="txt-c flex-5 lt-md-hide">Vis</Typography>
                    <Typography variant="subheading" color="primary" className="txt-c flex-5 lt-md-hide">Sound</Typography>
                </div>
                {this.state.addNew ? <MovieForm cancel={this.toggleEdit} submit={this.addMovie} /> : null}
                {movieRows}
            </div>
        )
    }

}

export default withTheme()(MovieList);
