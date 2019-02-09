import React, { Component } from 'react';
import * as d3 from 'd3';

const height = 400;
const width = 400;
var values = [1,2,3,4];
var pie = d3.pie()(values);

export default class PieChart extends Component {
  
  constructor(props){
      super(props);
      values = [];
      for(var i=0; i<this.props.data.length; i++)
        values[i] = this.props.data[i].percentage;
      pie = d3.pie()(values);
  }
  render() {
    return (
      <div>
      
        <svg height={height} width={width}>
            <g transform={'translate('+(width/2)+','+(height/2)+')'}>
                <Slice pie={pie} />
            </g>
        </svg>
      </div>
    )
  }
  
}

const Slice = props => {
  let { pie } = props;

  let arc = d3
    .arc()
    .innerRadius(75)
    .outerRadius(125);

  let interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

  return pie.map((slice, index) => {
    let sliceColor = interpolate(index / (pie.length - 1));

    return <path d={arc(slice)} fill={sliceColor} />;
  });
};