import React from 'react';
import { PropTypes } from 'prop-types';

import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import axios from 'axios';

import MovieSearch from '../movie-search/movie-search';
import NumberView from '../number-view';

import './movie-form.css';

class MovieForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: this.props.movie || null
        };

        // bindings
        this.updateMovie = this.updateMovie.bind(this);
    }

    static propTypes = {
        submit: PropTypes.func.isRequired,
        cancel: PropTypes.func.isRequired,
        delete: PropTypes.func
    };

    handleInput(e) {
        const key = e.target.name;
        const value = key === 'title' || key === 'comments' ? e.target.value :
            key === 'releaseDate' ? new Date(e.target.value).getTime() : +e.target.value;
        let movie = Object.assign({}, this.state.movie, { [e.target.name]: value });
        movie.wRating = this.calculateRating(movie);
        this.setState({ movie: movie });
    }

    calculateRating(movie) {
        const characterDev = ((movie.wCharacterRating || 0) + (movie.wPerformanceRating || 0)) / 2;
        const effects = ((movie.wVisualRating || 0) + (movie.wSoundRating || 0)) / 2;
        return ((movie.wStoryRating || 0) + characterDev + effects) / 3;
    }

    addTag(e) {
        const value = e.target.value;
        const movie = this.state.movie;
        e.target.value = ""

        if (!value ||
            (movie.tags && movie.tags.includes(value)))
            return;

        const tags = movie.tags || [];
        const updatedTags = [...tags, value];
        let updatedMovie = Object.assign({}, movie, { tags: updatedTags });
        this.setState({ movie: updatedMovie });
    }

    deleteTag(i) {
        const movie = this.state.movie;
        const tags = movie.tags || [];
        const updatedTags = [...tags.slice(0, i), ...tags.slice(i + 1)];
        let updatedMovie = Object.assign({}, movie, { tags: updatedTags });
        this.setState({ movie: updatedMovie });
    }

    updateMovie(id) {
        axios.get(`/api/movies/${id}`)
            .then(res => {
                this.setState({ movie: res.data });
            });
    }

    render() {
        const movie = this.state.movie;
        console.debug('movie', movie);

        const tagList = movie && movie.tags ?
            movie.tags.map((t, i) => {
                return (
                    <Chip key={i} label={t} onDelete={() => this.deleteTag(i)} style={{ margin: '5px' }} />
                )
            }) : null;

        return (
            <div className="movie-form column items-center flex-80">
                {!movie ? <MovieSearch onSelect={this.updateMovie} /> :
                    <div className="column flex-100">
                        <div className="row lt-sm-column flow-start">
                            <img src={movie.poster} alt="" className="cover fixed-150 height-150" />
                            <div className="column">
                                <h1 style={{margin: '5px'}}>
                                    {movie.wRating ? <NumberView value={movie.wRating} decimalPlaces={2} /> : '-'}
                                </h1>
                                <div className="row wrap flow-start flex-100">
                                    <input name="wStoryRating" defaultValue={movie.wStoryRating}
                                        className="wr-mat-input fixed-50 txt-c" type="number"
                                        max="10" min="1" placeholder="Stor" onBlur={(e) => this.handleInput(e)} />

                                    <input name="wCharacterRating" defaultValue={movie.wCharacterRating}
                                        className="wr-mat-input fixed-50 txt-c" type="number"
                                        max="10" min="1" placeholder="Char" onBlur={(e) => this.handleInput(e)} />

                                    <input name="wPerformanceRating" defaultValue={movie.wPerformanceRating}
                                        className="wr-mat-input fixed-50 txt-c" type="number"
                                        max="10" min="1" placeholder="Perf" onBlur={(e) => this.handleInput(e)} />

                                    <input name="wVisualRating" defaultValue={movie.wVisualRating}
                                        className="wr-mat-input fixed-50 txt-c" type="number"
                                        max="10" min="1" placeholder="Vis" onBlur={(e) => this.handleInput(e)} />

                                    <input name="wSoundRating" defaultValue={movie.wSoundRating}
                                        className="wr-mat-input fixed-50 txt-c" type="number"
                                        max="10" min="1" placeholder="Aud" onBlur={(e) => this.handleInput(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="row wrap flow-start flex-100">
                            {tagList}
                            <input name="tags"
                                className="wr-mat-input fixed-100 txt-c" type="text"
                                placeholder="add tag" onKeyPress={(e) => { if (e.key === 'Enter') this.addTag(e) }} />
                        </div>
                        <div className="row wrap flow-center flex-100">
                            <textarea name="comments" rows="1" placeholder="Comments" defaultValue={movie.comments}
                                className="wr-mat-input flex-100" onBlur={(e) => this.handleInput(e)} />
                        </div>
                        <div className="row flow-end flex-100">
                            <Button onClick={this.props.cancel}>Cancel</Button>
                            {this.props.delete ? <Button onClick={this.props.delete} color="secondary">Delete</Button> : null}
                            <Button onClick={() => this.props.submit(movie)}
                                disabled={!movie.title || !movie.released}
                                variant="raised" color="primary">Sumbit</Button>
                        </div>
                    </div>}
            </div>
        );
    }

}

export default MovieForm;
