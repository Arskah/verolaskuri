import React, { Component } from 'react';
import Slider from '../Slider/Slider';
import InputRange from 'react-input-range';

export default class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleIncome = () => {

  }

  handleTax = (value) => {
    // this.setState({
    //   value,
    // });
    // this.props.tax(value);
  }

  handleYear = () => {

  }

  render() {
    return (
      <div>
        <Slider id="income" label="Income"
          min={100}
          max={10000}
          defaultVal={100}
          handlerFunc={this.props.income} />
        <Slider id="tax" label="Tax percentage"
          min={0}
          max={100}
          defaultVal={5}
          handlerFunc={this.props.tax} />
        <Slider id="year" label="Income"
          min={2014}
          max={2018}
          defaultVal={2014}
          handlerFunc={this.props.year} />
      </div>
      // <InputRange
      //   maxValue={100}
      //   minValue={0}
      //   value={this.state.tax}
      //   onChange={tax => this.setState({tax})}
      // />
      // <InputRange
      // maxValue={20}
      // minValue={0}
      // value={this.state.value}
      // onChange={value => this.setState({ value })}
      // onChangeComplete={value => console.log(value)} />
    )
  }
}