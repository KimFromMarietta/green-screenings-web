import React from 'react';
import Drawer from 'material-ui/Drawer';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import axios from 'axios';

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            open: this.props.open
        };

        // bindings
        this.handleCheck = this.handleCheck.bind(this);
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
            this.setState({
                tags: res.data
            })
        })
    }

    handleCheck(event) {
        this.setState({ [event.target.value]: event.target.checked });
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
            <Drawer variant="persistent" open={this.state.open}>
                <div className="column fixed-300">
                    <Toolbar>
                        <Button onClick={this.close}><i className="material-icons">chevron_left</i></Button>
                    </Toolbar>
                    <Divider />
                    {tagList}
                </div>
            </Drawer>
        )
    }
}

export default Filters;
