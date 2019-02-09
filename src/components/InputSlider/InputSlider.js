import React, { Component } from 'react';
import './InputSlider.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
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
    const { id, label, min, max, classes, step } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
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
};

export default withStyles(styles)(InputSlider);
