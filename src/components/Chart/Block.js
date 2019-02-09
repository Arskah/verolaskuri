import React, { Component } from 'react';



export default class Block extends Component {
  constructor(props){
      super(props);
      
  }
  render() {
    return (
      <div>
        <div>
            {this.props.name}
        </div>
        <div>
            {this.props.sum}
        </div>
      </div>
    )
  }
}