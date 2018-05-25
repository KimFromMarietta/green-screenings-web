import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography'
import Chip from 'material-ui/Chip';

import './movie-details.css';
import NumberView from '../number-view';

class MovieDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: props.movie,
            edit: false,
            open: this.props.open
        }

        //bindings 
        this.toggleEdit = this.toggleEdit.bind(this);
        this.close = this.close.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            open: nextProps.open
        }
    }

    static propTypes = {
        movie: PropTypes.object.isRequired,
        rank: PropTypes.number.isRequired,
        submit: PropTypes.func,
        delete: PropTypes.func
    }

    close() {
        this.setState({
            edit: false,
            open: false
        })
    }

    // form controls =========================
    toggleEdit() {
        this.setState({
            edit: !this.state.edit
        })
    }

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
    // end form controls =============================

    render() {
        const movie = this.state.movie;
        const releaseDate = new Date(movie.released);
        const tagList = movie && movie.tags ?
            movie.tags.map((t, i) => {
                return (
                    !this.state.edit ? <Chip key={i} label={t} style={{ margin: '5px' }} /> :
                        <Chip key={i} label={t} onDelete={() => this.deleteTag(i)} style={{ margin: '5px' }} />
                )
            }) : null;

        const ratings = movie.ratings.map((rating, i) => {
            return (
                <div key={i} className="wr-card column items-center flex-20 ext-rating">
                    <p className="txt-c">{rating.Source}</p>
                    <h2>{rating.Value}</h2>
                </div>
            )
        });

        if (this.state.open) console.debug('should be open');

        const dialogStyle = {
            background: movie.poster,
            backgroundSize: 'fill'
        };

        return (
            <Dialog open={this.state.open} onClose={this.props.onClose} className="detail-dialog">
                <DialogTitle>#{this.props.rank} {movie.title}</DialogTitle>
                <Button onClick={this.toggleEdit} className="top-right"><i className="material-icons">
                    {!this.state.edit ? 'edit' : 'cancel'}
                </i></Button>
                <div className="column" style={{ padding: '10px' }}>
                    <div className="row flow-center wrap">
                        <div id="rating" className="wr-card column items-center flex-20 lt-sm-flex-100 user-rating">
                            <p>My rating</p>
                            <h2><NumberView value={movie.wRating} decimalPlaces={2} /> / 10</h2>
                        </div>
                        <div id="story-rating" className="wr-card column items-center lt-sm-flex-40 user-rating">
                            <p>Story</p>
                            {!this.state.edit ? <h2>{movie.wStoryRating} / 10</h2> :
                                <input name="wStoryRating" defaultValue={movie.wStoryRating}
                                    className="wr-mat-input fixed-50 txt-c" type="number"
                                    max="10" min="1" placeholder="Stor" onBlur={(e) => this.handleInput(e)} />}
                        </div>
                        <div id="char-rating" className="wr-card column items-center lt-sm-flex-40 user-rating">
                            <p>Char</p>
                            {!this.state.edit ? <h2>{movie.wCharacterRating} / 10</h2> :
                                <input name="wCharacterRating" defaultValue={movie.wCharacterRating}
                                    className="wr-mat-input fixed-50 txt-c" type="number"
                                    max="10" min="1" placeholder="Stor" onBlur={(e) => this.handleInput(e)} />}
                        </div>
                        <div id="perf-rating" className="wr-card column items-center lt-sm-flex-40 user-rating">
                            <p>Perf</p>
                            {!this.state.edit ? <h2>{movie.wPerformanceRating} / 10</h2> :
                                <input name="wPerformanceRating" defaultValue={movie.wPerformanceRating}
                                    className="wr-mat-input fixed-50 txt-c" type="number"
                                    max="10" min="1" placeholder="Stor" onBlur={(e) => this.handleInput(e)} />}
                        </div>
                        <div id="visual-rating" className="wr-card column items-center lt-sm-flex-40 user-rating">
                            <p>Visuals</p>
                            {!this.state.edit ? <h2>{movie.wVisualRating} / 10</h2> :
                                <input name="wVisualRating" defaultValue={movie.wVisualRating}
                                    className="wr-mat-input fixed-50 txt-c" type="number"
                                    max="10" min="1" placeholder="Stor" onBlur={(e) => this.handleInput(e)} />}
                        </div>
                        <div id="sound-rating" className="wr-card column items-center lt-sm-flex-40 user-rating">
                            <p>Sounds</p>
                            {!this.state.edit ? <h2>{movie.wSoundRating} / 10</h2> :
                                <input name="wSoundRating" defaultValue={movie.wSoundRating}
                                    className="wr-mat-input fixed-50 txt-c" type="number"
                                    max="10" min="1" placeholder="Stor" onBlur={(e) => this.handleInput(e)} />}
                        </div>
                    </div>
                    <div className="row">
                        <img src={movie.poster} alt="" onClick={() => window.open(movie.imdburl, '_blank')} />
                        <div className="column">
                            <div className="row" style={{ marginBottom: '5px' }}>
                                <Typography variant="subheading" color="primary" style={{ marginRight: '5px' }}>Starring: </Typography>
                                <Typography variant="title">{movie.actors}</Typography>
                            </div>
                            <div className="row" style={{ marginBottom: '5px' }}>
                                <Typography variant="subheading" color="primary" style={{ marginRight: '5px' }}>Director: </Typography>
                                <Typography variant="title">{movie.director}</Typography>
                            </div>
                            <div className="row" style={{ marginBottom: '5px' }}>
                                <Typography variant="subheading" color="primary" style={{ marginRight: '5px' }}>Released: </Typography>
                                <Typography variant="title">{releaseDate.toLocaleDateString()}</Typography>
                            </div>
                            <Typography variant="subheading" color="primary">{movie.runtime}</Typography>
                            <Typography variant="title">{movie.rated}</Typography>
                        </div>
                    </div>
                    <div className="row wrap flow-start flex-100">
                        {tagList}
                        {!this.state.edit ? null :
                            <input name="tags"
                                className="wr-mat-input fixed-100 txt-c" type="text"
                                placeholder="add tag" onKeyPress={(e) => { if (e.key === 'Enter') this.addTag(e) }} />}
                    </div>
                    <p variant="body2">{movie.plot}</p>
                    <div className="row">
                        {ratings}
                    </div>
                    {!this.state.edit ? null :
                        <div className="row flow-end flex-100">
                            <Button onClick={() => { this.props.delete(); this.close(); }} color="secondary">Delete</Button>
                            <Button onClick={() => {this.props.submit(movie); this.close();}}
                                disabled={!movie.title || !movie.released}
                                variant="raised" color="primary">Sumbit</Button>
                        </div>}
                </div>
            </Dialog>
        )
    }
}

export default MovieDialog;
