import React, { Component } from 'react';
import InputSlider from '../InputSlider/InputSlider';
import './InputContainer.css';

export default class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="input-container">
        <InputSlider id="year" label="Valitse vuosi"
          min={2014}
          max={2019}
          defaultVal={2014}
          handlerFunc={this.props.year}
          step={1}
        />
        <InputSlider id="income" label="Valitse tulotasosi"
          min={100}
          max={10000}
          defaultVal={100}
          handlerFunc={this.props.income}
          step={100}
          unit={'€'}
        />
        <InputSlider id="tax" label="Valitse verokategoriasi"
          min={0}
          max={100}
          defaultVal={5}
          handlerFunc={this.props.tax}
          step={1}
          unit={"%"}
        />
      </div>
    )
  }
}