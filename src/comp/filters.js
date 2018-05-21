import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Divider from 'material-ui/Divider';

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tagFilter: this.props.tagFilter || 'All'
        };

        // bindings
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.update(event.target.value === 'All' ? null : event.target.value);
    }

    render() {
        const tagList = this.props.tags.map((val, i) => {
            return (
                <FormControlLabel
                    key={i}
                    style={{ margin: '-5px 20px' }}
                    value={val}
                    control={<Radio checked={this.state.tagFilter === val} />}
                    label={val}
                />
            )
        });
        return (
            <div>
                <Divider />
                <h3 style={{ margin: '0px 20px' }}>{this.props.title}</h3>
                <RadioGroup
                    name="tagFilter"
                    defaultValue={this.state.tagFilter}
                    onChange={this.handleFilter}
                >
                    {tagList}
                </RadioGroup>
            </div>
        )
    }
}

export default Filters;
