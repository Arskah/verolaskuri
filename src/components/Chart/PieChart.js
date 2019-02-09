import React, { Component } from 'react';
import * as d3 from 'd3';
import './PieChart.css';

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
    this.state = {
      width: width,
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
  }

  updateSize = () => {
    const width = window.innerWidth;
    this.setState(
      {
        width: width,
      });
  };

  render() {
    const { width } = this.state;
    return (

      <div className='svg-container'>
        <svg className='svg-img' preserveAspectRatio="xMinYMin meet">
          <g transform={'translate('+(width/2)+','+(400/2)+')'}>
            <Slice pie={pie} innerRadius={75} outerRadius={125}/>
            <Labels pie={pie} labels={labels} />
            <text y="-25" textAnchor="middle" style={{"font-size":"10px"}}>MAKSOIT VEROJA</text>
            <text y="10"textAnchor="middle">{this.props.tax + " €"}</text>
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
  const { pie, innerRadius, outerRadius } = props;

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

  return pie.map((slice, index) => {
    const sliceColor = interpolate(index / (pie.length - 1));

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
    console.log(labels[index] + " " + angle3);
    let nx;
    let ny;
    let r = 130;
    if(angle3 < (Math.PI/2)){
        nx = r * Math.cos(angle3);
        ny = -r * Math.sin(angle3);
    } else if(angle3 < (Math.PI)){
        nx = -r * Math.cos(angle3);
        ny = r * Math.sin(angle3);
    } else if(angle3 < (Math.PI*1.5)){
        nx = r * Math.sin(angle3);
        ny = -r * Math.cos(angle3);
    } else{
        nx = r * Math.sin(angle3);
        ny = -r * Math.cos(angle3);
    }

    let textAnchoring = "start";
    if(nx < 0)
        textAnchoring = "end";
    return <text style={{"font-size":"14px"}}textAnchor={textAnchoring} x={nx} y={ny}>{labels[index]}</text>;
  });
};