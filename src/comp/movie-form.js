import React from 'react';
import { PropTypes } from 'prop-types';

import Button from 'material-ui/Button';

class MovieForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                storyRating: 1,
                characterRating: 1,
                performanceRating: 1,
                visualRating: 1,
                soundRating: 1
            }
        };
    }

    static propTypes = {
        submit: PropTypes.func,
        cancel: PropTypes.func
    };

    handleInput(e) {
        const key = e.target.name;
        const value = key === 'title' ? e.target.value :
                        key === 'releaseDate' ? new Date(e.target.value) : +e.target.value;
        let movie = Object.assign({}, this.state.movie, {[e.target.name]: value});
        movie.rating = this.calculateRating(movie);
        this.setState({movie: movie});
    }

    calculateRating(movie) {
        const characterDev = (movie.characterRating + movie.performanceRating) / 2;
        const effects = (movie.visualRating + movie.soundRating) / 2;
        return (movie.storyRating + characterDev + effects) / 3;
    }

    render() {
        return (
            <div className="movie-form column items-center flex-70">
                <div className="row wrap items-center flex-100">
                    <input name="title" className="wr-input flex-60 lt-md-flex-100" type="text" 
                    placeholder="Title" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="releaseDate" className="wr-input flex-30 lt-md-flex-100 txt-c" type="date" 
                    placeholder="Release" onChange={(e) => this.handleInput(e)}/>
                </div>
                <div className="row wrap flow-center flex-100">
                    <input name="storyRating" className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    defaultValue={1} max="10" min="1" placeholder="Story" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="characterRating" className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    defaultValue={1} max="10" min="1" placeholder="Char" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="performanceRating" className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    defaultValue={1} max="10" min="1" placeholder="Perf" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="visualRating" className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    defaultValue={1} max="10" min="1" placeholder="Visual" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="soundRating" className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    defaultValue={1} max="10" min="1" placeholder="Sound" onChange={(e) => this.handleInput(e)}/>
                </div>
                <div className="row flow-end flex-100">
                    <Button onClick={this.props.cancel}>Cancel</Button>
                    <Button onClick={() => this.props.submit(this.state.movie)} 
                        disabled={!this.state.movie.title || !this.state.movie.releaseDate} 
                        variant="raised" color="primary">Add</Button>
                </div>
            </div>
        );
    }

}

export default MovieForm;
