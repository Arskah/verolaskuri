import React, { Component } from 'react';
import './App.css';

import yearlist from './data.json';

import InputContainer from './components/InputContainer/InputContainer';

import PieChart from './components/Chart/PieChart';


const katainen = require("img/katainen.png");
const stubb = require("img/stubb.png");
const hiiri = require("img/hiiri.jpg");
const sipila = require("img/sipila.png");


let testArray = [{"percentage":5, "sum" : 100, "name":"Test1"},{"percentage":10, "sum" : 100, "name":"Test2"},{"percentage":15, "sum" : 100, "name":"Test3"},{"percentage":20, "sum" : 100, "name":"Test4"},{"percentage":25, "sum" : 100, "name":"Test5"},{"percentage":30, "sum" : 100, "name":"Test6"},{"percentage":35, "sum" : 200, "name":"Test7"}];

const ImageContainer = (props) => {
  if(props.year == 2014 ) {
    return (
      <div>
        <img src={katainen} />
        <img src={stubb} />
      </div>
    )
  }
  if(props.year == 2019) {
    return (
      <div>
        <img src={hiiri} />
      </div>
    )
  }
  return (
    <div>
      <img src={sipila} />
    </div>
  )
}
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 100,
      tax: 5,
      year: 2014,
    }
    // console.log(yearlist);
  }

  incomeHandler = (input) => {
    // console.log(input);
    this.setState({
      income: input,
    });
  }

  taxHandler = (input) => {
    // console.log(input);
    this.setState({
      tax: input,
    });
  }

  yearHandler = (input) => {
    // console.log(input);
    this.setState({
      year: input,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PieChart tax={this.state.tax * this.state.income} year={this.state.year} data={yearlist.yearlist[this.state.year-2014]} />
          <InputContainer income={this.incomeHandler} tax={this.taxHandler} year={this.yearHandler} />
          <ImageContainer year={this.state.year}/>
        </header>
      </div>
    );
  }
}

export default App;
