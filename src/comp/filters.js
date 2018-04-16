import React from 'react';
import Drawer from 'material-ui/Drawer';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import axios from 'axios';

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };

        // bindings
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentWillMount() {
        this.getFilters();
    }

    getFilters() {
        axios.get('/api/movies/tags').then(res => {
            this.setState({
                tags: res.data
            })
        })
    }

    handleCheck(event) {
        this.setState({[event.target.value]: event.target.checked});
    }

    render() {
        const tagList = this.state.tags.map((val, i) => {
                return (
                    <FormControlLabel
                        key={i}
                        control={
                            <Checkbox
                                checked={this.state[val]}
                                onChange={this.handleCheck}
                                value={val}
                                color="primary"
                            />
                        }
                        label={val}
                    />
                )
            });
        return (
            <Drawer variant="permanent">
                {tagList}
            </Drawer>
        )
    }
}

export default Filters;
