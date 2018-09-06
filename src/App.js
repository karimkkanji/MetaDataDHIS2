import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Tabpane from './Tabpane';
import Alert from './Alert';
import LetterResults from './LetterResults';
import ButtonGroup from './ButtonGroup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const BasicExample = () => (
    <Router>
      <div>
        <Route exact path="/" component={Start} />
        <Route path="/:getVal" component={Letter} />
        </div>  
    </Router>
  );
  const Start = () => {
   return <Alert title="Hello there!" message="Click any letter here to see the metadata definitons" />
  };
  const Letter = ({match}) => {
  return <LetterResults letter={match.params.getVal}/>
  };
class App extends Component {
  render() {
    return (
      <div>
        <Navbar item="Data Elements"/>
        <Tabpane />
        <ButtonGroup pageNavigated="datasets"/>
        <BasicExample />
        
      </div>
    );
  }
}

export default App;
