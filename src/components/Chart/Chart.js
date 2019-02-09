import React, { Component } from 'react';

import Block from './Block';

export default class Chart extends Component {
  constructor(props){
      super(props);
      
  }
  render() {
    return (
      <div>
        Chart
        {this.components()}
      </div>
    )
  }
  
    components = () => {
        var components = [];
        for(var i=0; i<this.props.blocks.length; i++){
            components.push(<Block name = {this.props.blocks[i].name} sum={this.props.blocks[i].sum} />)
        }
        return components;
    }
}
