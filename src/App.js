import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Tabpane from './Tabpane';
import  DetailsMore from './DetailsMore';

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            showTabs:true
        }
    }
    changeStuff(show) {
        if(show==="false")
        this.setState({showTabs:false});
    }

    render() {
    return (
      <div>
          {/*This is the navbar component*/}
        <Navbar item="Data Elements"/>
          {/*Tabpane component shows the tabs*/}
          {this.state.showTabs ? <Tabpane changeHandler={this.changeStuff.bind(this)} /> : <DetailsMore />}
      </div>
    );
  }
}

export default App;
