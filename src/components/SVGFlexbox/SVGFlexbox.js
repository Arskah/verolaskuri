import React, { Component } from 'react';
import Flexbox from 'react-svg-flexbox';
import * as d3 from 'd3';

export default class SVGFlexbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1024
    };
  }

  svgRef = React.createRef();
  componentDidMount() {
    window.addEventListener("resize", this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
  }

  updateSize = () => {
    this.setState({ width: this.svgRef.current.clientWidth });
  };

  render() {
    const { pie } = this.props;
    return (
      <div>
        <svg className='svg-img'>
          {/* <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 800 960"> */}
          {/* <g> */}
          <Slice pie={pie} inner={75} outer={125} />
          {/* <g transform={'translate('+(width/2)+','+(height/2)+')'}>
            <Slice pie={pie} />
          </g> */}
        </svg>
        <svg
            style={{ width: "100%", height: 1024 }}
            ref={this.svgRef}
        />
        <Flexbox
            style={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                width: this.state.width,
                height: 1024
            }}
        />
      </div>
    )
  }
}

const Slice = props => {
  const { pie, inner, outer } = props;
  const arc = d3
    .arc()
    .innerRadius(inner)
    .outerRadius(outer);
  const interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

  return pie.map((slice, index) => {
    let sliceColor = interpolate(index / (pie.length - 1));

    return <path d={arc(slice)} fill={sliceColor} />;
  });
};
