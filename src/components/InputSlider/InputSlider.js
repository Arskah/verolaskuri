import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: '100%',
    padding: '0.2rem',
  },
  slider: {
    padding: '1.2rem 0',
  },
};

class InputSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultVal,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.handlerFunc(value);
  }

  render() {
    const { id, label, min, max, classes, step, unit } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        {label}: {value} {unit}
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

InputSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  defaultVal: PropTypes.number.isRequired,
  unit: PropTypes.string,
};

export default withStyles(styles)(InputSlider);
