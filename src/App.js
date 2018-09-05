import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Tabpane from './Tabpane';
import Alert from './Alert';
import ButtonGroup from './ButtonGroup';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Tabpane />
        <ButtonGroup/>
        <Alert title="Hello there!" message="Click any letter here to see the metadata definitons" />
      </div>
    );
  }
}

export default App;
