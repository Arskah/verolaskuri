import React, { Component } from 'react';

export default class Slider extends Component {
  render() {
    const { id, label, defaultVal, min, max, handlerFunc, } = this.props;
    return (
      <form>
        <input
          type="range"
          id={id}
          name={id}
          min={min}
          max={max}
          defaultValue={defaultVal}
          onChange={value => handlerFunc(value.target.value)}
        />
        <label htmlFor={id}>{label}</label>
      </form>
    )
  }
}
