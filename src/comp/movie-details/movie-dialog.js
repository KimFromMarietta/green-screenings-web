import React from 'react'
import PropTypes from 'prop-types'
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography'
import Chip from 'material-ui/Chip';

import './movie-details.css';
import NumberView from '../number-view';

const MovieDialog = (props) => {
    const movie = props.movie;
    const releaseDate = new Date(movie.released);
    const tagList = movie && movie.tags ?
        movie.tags.map((t, i) => {
            return (
                <Chip key={i} label={t} style={{ margin: '5px' }} />
            )
        }) : null;

    const ratings = movie.ratings.map((rating, i) => {
        return (
            <div className="wr-card column items-center flex-20 ext-rating">
                <p className="txt-c">{rating.Source}</p>
                <h2>{rating.Value}</h2>
            </div>
        )
    });

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>#{props.rank} {movie.title}</DialogTitle>
            <div className="column" style={{ padding: '10px' }}>
                <div className="row">
                    <div id="rating" className="wr-card column items-center flex-20 user-rating">
                        <p>My rating</p>
                        <h2><NumberView value={movie.wRating} decimalPlaces={2} /> / 10</h2>
                    </div>
                    <div id="story-rating" className="wr-card column items-center flex-15 user-rating">
                        <p>Story</p>
                        <h2>{movie.wStoryRating} / 10</h2>
                    </div>
                    <div id="char-rating" className="wr-card column items-center flex-15 user-rating">
                        <p>Char</p>
                        <h2>{movie.wCharacterRating} / 10</h2>
                    </div>
                    <div id="perf-rating" className="wr-card column items-center flex-15 user-rating">
                        <p>Perf</p>
                        <h2>{movie.wPerformanceRating} / 10</h2>
                    </div>
                    <div id="visual-rating" className="wr-card column items-center flex-15 user-rating">
                        <p>Visuals</p>
                        <h2>{movie.wVisualRating} / 10</h2>
                    </div>
                    <div id="sound-rating" className="wr-card column items-center flex-15 user-rating">
                        <p>Sounds</p>
                        <h2>{movie.wSoundRating} / 10</h2>
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
                </div>
                <p variant="body2">{movie.plot}</p>
                <div className="row">
                    {ratings}
                </div>
            </div>
        </Dialog>
    )
}

MovieDialog.propTypes = {
    movie: PropTypes.object.isRequired,
    rank: PropTypes.number.isRequired
}

export default MovieDialog;
