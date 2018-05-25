import React from 'react';
import axios from 'axios';

import List, { ListItem } from '@material-ui/core/List';

import './movie-search.css';

export class MovieSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        // bindings
        this.search = this.search.bind(this);
    }

    search(event) {
        if (event.key !== 'Enter') return;
        axios.get(`/api/movies?title=${encodeURI(event.target.value)}`)
            .then(result => {
                this.setState({ results: result.data.results });
            });
    }

    render() {

        const resultList = !this.state.results ? null : this.state.results.map((movie, i) => {
            return (
                <ListItem key={i} button onClick={() => this.props.onSelect(movie.imdbid)}>
                    <img src={movie.poster} alt="" />
                    <h2>{movie.title}</h2>
                </ListItem>
            )
        });

        return (
            <div className="column flex-100">
                <input name="title" placeholder="find a movie..." className="wr-input" onKeyPress={this.search} />
                {!resultList ? null :
                    <List className="result-list">
                        {resultList}
                    </List>
                }
            </div>
        )
    }
}

export default MovieSearch;