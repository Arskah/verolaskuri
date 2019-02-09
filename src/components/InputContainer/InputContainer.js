import React, { Component } from 'react';
import InputSlider from '../InputSlider/InputSlider';

export default class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <InputSlider id="income" label="Income"
          min={100}
          max={10000}
          defaultVal={100}
          handlerFunc={this.props.income}
          step={100}
        />
        <InputSlider id="tax" label="Tax percentage"
          min={0}
          max={100}
          defaultVal={5}
          handlerFunc={this.props.tax}
          step={1}
        />
        <InputSlider id="year" label="Income"
          min={2014}
          max={2018}
          defaultVal={2014}
          handlerFunc={this.props.year}
          step={1}
        />
      </div>
    )
  }
}