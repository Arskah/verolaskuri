import React, { Component } from 'react';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0,
    }
  }


  render() {
    const { id, label, min, max, } = this.props;
    return (
      <div>
        <input type="range" id={id} name={id} min={min} max={max} />
        <label for={id}>{label}</label>
      </div>
    )
  }
}
