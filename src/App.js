import React, { Component } from 'react';
import './App.css';

import yearlist from './data.json';

import InputContainer from './components/InputContainer/InputContainer';

import PieChart from './components/Chart/PieChart';

let testArray = [{"percentage":5, "sum" : 100, "name":"Test1"},{"percentage":10, "sum" : 100, "name":"Test2"},{"percentage":15, "sum" : 100, "name":"Test3"},{"percentage":20, "sum" : 100, "name":"Test4"},{"percentage":25, "sum" : 100, "name":"Test5"},{"percentage":30, "sum" : 100, "name":"Test6"},{"percentage":35, "sum" : 200, "name":"Test7"}];

const ImageContainer = (props) => {
  if(this.state.year == 2014 ) {
    return (
      <div>
        <img src='./img/katainen.png' />
        <img src='./img/stubb.png' />
      </div>
    )
  }
  if(this.state.year == 2019) {
    return (
      <div>
        <img src='./img/hiiri.jpg' />
      </div>
    )
  }
  return (
    <div>
      <img src='./sipila.png' />
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
          <ImageContainer />
        </header>
      </div>
    );
  }
}

export default App;
