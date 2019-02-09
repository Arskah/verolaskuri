import React, { Component } from 'react';
import Slider from '../Slider/Slider';

export default class InputContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Slider id="income" label="Income" min={0} max={100000} income={this.props.income} />
        <Slider id="tax" label="Tax percentage" min={0} max={100} tax={this.props.tax}/>
        <Slider id="year" label="Income" min={2014} max={2018} year={this.props.year} />
      </div>
    )
  }
}