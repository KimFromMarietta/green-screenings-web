import React from 'react';
import { PropTypes } from 'prop-types';

import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';

class MovieForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: this.props.movie ||
                {
                    storyRating: 1,
                    characterRating: 1,
                    performanceRating: 1,
                    visualRating: 1,
                    soundRating: 1
                }
        };
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
        movie.rating = this.calculateRating(movie);
        this.setState({ movie: movie });
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

    calculateRating(movie) {
        const characterDev = (movie.characterRating + movie.performanceRating) / 2;
        const effects = (movie.visualRating + movie.soundRating) / 2;
        return (movie.storyRating + characterDev + effects) / 3;
    }

    render() {
        const date = this.state.movie.releaseDate ? new Date(this.state.movie.releaseDate) : null;
        const dateString = date ? `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).substr(-2)}-${('0' + date.getUTCDate()).substr(-2)}` : '';

        const tagList = this.state.movie.tags ?
            this.state.movie.tags.map((t, i) => {
                return (
                    <Chip key={i} label={t} onDelete={() => this.deleteTag(i)} style={{margin: '5px'}} />
                )
            }) : null;

        return (
            <div className="movie-form column items-center flex-80">
                <div className="row wrap items-center flex-100">
                    <input name="title" defaultValue={this.state.movie.title}
                        className="wr-mat-input flex-60 lt-md-flex-100" type="text"
                        placeholder="Title" onBlur={(e) => this.handleInput(e)} />

                    <input name="releaseDate" defaultValue={dateString}
                        className="wr-mat-input flex-30 lt-md-flex-100 txt-c" type="date"
                        placeholder="Release" onBlur={(e) => this.handleInput(e)} />
                </div>
                <div className="row wrap flow-center flex-100">
                    <input name="storyRating" defaultValue={this.state.movie.storyRating}
                        className="wr-mat-input flex-15 lt-md-flex-35 txt-c" type="number"
                        max="10" min="1" placeholder="Story" onBlur={(e) => this.handleInput(e)} />

                    <input name="characterRating" defaultValue={this.state.movie.characterRating}
                        className="wr-mat-input flex-15 lt-md-flex-35 txt-c" type="number"
                        max="10" min="1" placeholder="Char" onBlur={(e) => this.handleInput(e)} />

                    <input name="performanceRating" defaultValue={this.state.movie.performanceRating}
                        className="wr-mat-input flex-15 lt-md-flex-35 txt-c" type="number"
                        max="10" min="1" placeholder="Perf" onBlur={(e) => this.handleInput(e)} />

                    <input name="visualRating" defaultValue={this.state.movie.visualRating}
                        className="wr-mat-input flex-15 lt-md-flex-35 txt-c" type="number"
                        max="10" min="1" placeholder="Visual" onBlur={(e) => this.handleInput(e)} />

                    <input name="soundRating" defaultValue={this.state.movie.soundRating}
                        className="wr-mat-input flex-15 lt-md-flex-35 txt-c" type="number"
                        max="10" min="1" placeholder="Sound" onBlur={(e) => this.handleInput(e)} />
                </div>
                <div className="row wrap flow-start flex-100">
                    {tagList}
                    <input name="tags"
                        className="wr-mat-input fixed-100 txt-c" type="text"
                        placeholder="add tag" onKeyPress={(e) => { if (e.key === 'Enter') this.addTag(e) }} />
                </div>
                <div className="row wrap flow-center flex-100">
                    <textarea name="comments" rows="1" placeholder="Comments" defaultValue={this.state.movie.comments}
                        className="wr-mat-input flex-100" onBlur={(e) => this.handleInput(e)} />
                </div>
                <div className="row flow-end flex-100">
                    <Button onClick={this.props.cancel}>Cancel</Button>
                    {this.props.delete ? <Button onClick={this.props.delete} color="secondary">Delete</Button> : null}
                    <Button onClick={() => this.props.submit(this.state.movie)}
                        disabled={!this.state.movie.title || !this.state.movie.releaseDate}
                        variant="raised" color="primary">Sumbit</Button>
                </div>
            </div>
        );
    }

}

export default MovieForm;
