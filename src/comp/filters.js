import React from 'react';
import Drawer from 'material-ui/Drawer';
import { FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import axios from 'axios';

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            open: this.props.open,
            tagFilter: 'All'
        };

        // bindings
        this.handleFilter = this.handleFilter.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        this.getFilters();
    }

    componentWillReceiveProps(nextProps, state) {
        this.setState({
            open: nextProps.open
        });
    }

    getFilters() {
        axios.get('/api/movies/tags').then(res => {
            let tags = res.data;
            tags.unshift('All');
            this.setState({
                tags: tags
            })
        })
    }

    handleFilter(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.update(event.target.value === 'All' ? null : event.target.value);
    }

    close() {
        this.props.close();
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const tagList = this.state.tags.map((val, i) => {
            return (
                <FormControlLabel
                    key={i}
                    style={{ margin: '-5px 20px' }}
                    value={val}
                    control={ <Radio checked={this.state.tagFilter === val}/> }
                    label={val}
                />
            )
        });
        return (
            <Drawer variant="persistent" open={this.state.open}>
                <div className="column fixed-300">
                    <Toolbar>
                        <Button onClick={this.close}><i className="material-icons">chevron_left</i></Button>
                    </Toolbar>
                    <Divider />
                    <RadioGroup
                        name="tagFilter"
                        defaultValue={this.state.tagFilter}
                        onChange={this.handleFilter}
                    >
                        {tagList}
                    </RadioGroup>
                </div>
            </Drawer>
        )
    }
}

export default Filters;
