import React, { Component } from 'react';
import * as d3 from 'd3';

const height = 400;
const width = 400;
const radius = Math.min(width, height) / 2;
var values = [1,2,3,4];
var labels = ["Sos. ter. ministeriö","Sisäministeriö"];
var pie = d3.pie()(values);

export default class PieChart extends Component {
  
  constructor(props){
      super(props);
      values = [];
      labels = [];
      for(var i=0; i<this.props.data.length; i++){
        values[i] = this.props.data[i].percentage;
        labels[i] = this.props.data[i].name;
      }
      pie = d3.pie()(values);
  }
  render() {
    return (
      <div>
      
        <svg height={height} width={width}>
            <g transform={'translate('+(width/2)+','+(height/2)+')'}>
                <Slice pie={pie} />
                <Labels pie={pie} labels={labels} />
            </g>
            
        </svg>
      </div>
    )
  }
  
}

function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
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
const Labels = props => {
  let { pie } = props;
  let { labels } = props;

  let arc = d3
    .arc()
    .innerRadius(140)
    .outerRadius(140);
    
  return pie.map((slice, index) => {
    let angle1 = slice.startAngle;
    let angle2 = slice.endAngle;
    let angle3 = (angle1 + angle2) / 2;
    let nx = (radius*1.8) * Math.cos(angle3);
    let ny = (radius*1.8) * Math.sin(angle3);
    let textAnchoring = "start";
    if(nx < 0)
        textAnchoring = "end";
        
    
    //pos[0] = radius * (Math.PI *2 - d2);
	/*pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
    pos[0] = radius;*/
    return <text textAnchor={textAnchoring} x={nx} y="0">{labels[index]}</text>;
  });
};