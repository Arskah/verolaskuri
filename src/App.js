import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Slider from './components/Slider/Slider';

import Chart from './components/Chart/Chart';

let testArray = [{"percentage":15, "sum" : 100, "name":"Test"},{"percentage":25, "sum" : 200, "name":"Test2"}];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Slider />
          <Chart blocks={testArray}/>
        </header>
      </div>
    );
  }
}

export default App;
