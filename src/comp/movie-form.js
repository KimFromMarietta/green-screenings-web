import React from 'react';
import { PropTypes } from 'prop-types';

import Button from 'material-ui/Button';

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
        const date = this.state.movie.releaseDate ? `${this.state.movie.releaseDate.getFullYear()}-${('0' + (this.state.movie.releaseDate.getMonth() + 1)).substr(-2)}-${this.state.movie.releaseDate.getDate()}` : '';
        return (
            <div className="movie-form column items-center flex-70">
                <div className="row wrap items-center flex-100">
                    <input name="title" value={this.state.movie.title} 
                    className="wr-input flex-60 lt-md-flex-100" type="text" 
                    placeholder="Title" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="releaseDate" value={date} 
                    className="wr-input flex-30 lt-md-flex-100 txt-c" type="date" 
                    placeholder="Release" onChange={(e) => this.handleInput(e)}/>
                </div>
                <div className="row wrap flow-center flex-100">
                    <input name="storyRating" value={this.state.movie.storyRating} 
                    className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    max="10" min="1" placeholder="Story" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="characterRating" value={this.state.movie.characterRating} 
                    className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    max="10" min="1" placeholder="Char" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="performanceRating" value={this.state.movie.performanceRating} 
                    className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    max="10" min="1" placeholder="Perf" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="visualRating" value={this.state.movie.visualRating} 
                    className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    max="10" min="1" placeholder="Visual" onChange={(e) => this.handleInput(e)}/>
                    
                    <input name="soundRating" value={this.state.movie.soundRating} 
                    className="wr-input flex-15 lt-md-flex-35 txt-c" type="number" 
                    max="10" min="1" placeholder="Sound" onChange={(e) => this.handleInput(e)}/>
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
