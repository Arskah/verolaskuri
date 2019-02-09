import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import InputContainer from './components/InputContainer/InputContainer';

import Chart from './components/Chart/Chart';
import PieChart from './components/Chart/PieChart';

let testArray = [{"percentage":5, "sum" : 100, "name":"Test1"},{"percentage":10, "sum" : 100, "name":"Test2"},{"percentage":15, "sum" : 100, "name":"Test3"},{"percentage":20, "sum" : 100, "name":"Test4"},{"percentage":25, "sum" : 100, "name":"Test5"},{"percentage":30, "sum" : 100, "name":"Test6"},{"percentage":35, "sum" : 200, "name":"Test7"}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 0,
      tax: 0,
      year: 2014,
    }
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
          <PieChart tax={this.state.tax * this.state.income} data={testArray} />
          <InputContainer income={this.incomeHandler} tax={this.taxHandler} year={this.yearHandler} />
        </header>
      </div>
    );
  }
}

export default App;
