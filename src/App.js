import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Tabpane from './Tabpane';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar item="Data Elements"/>
        <Tabpane />
      </div>
    );
  }
}

export default App;
