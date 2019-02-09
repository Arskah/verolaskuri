import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import InputContainer from './components/InputContainer/InputContainer';

import Chart from './components/Chart/Chart';
import PieChart from './components/Chart/PieChart';

let testArray = [{"percentage":15, "sum" : 100, "name":"Test"},{"percentage":25, "sum" : 200, "name":"Test2"}];

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
    this.setState({
      income: input,
    });
  }

  taxHandler = (input) => {
    this.setState({
      tax: input,
    });
  }

  yearHandler = (input) => {
    this.setState({
      year: input,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <InputContainer income={this.incomeHandler} tax={this.taxHandler} year={this.yearHandler} />
          <Chart blocks={testArray}/>
          <PieChart data={testArray} />
        </header>
      </div>
    );
  }
}

export default App;
