import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './Tabpane.css';
import LetterResults from "./LetterResults";

let valuePassed = "";
class ButtonGroup extends Component {
    constructor(props) {
    super(props);
        this.state = {
            showComponent: false,
        };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
}
handleClick(message) {
        valuePassed = message;
    this.setState({
        showComponent: true,
    });
}
genCharArray(charA,charZ){
        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (i; i <= j; ++i) {
            let letGot = String.fromCharCode(i);
            a.push(<ReactBootstrap.Button onClick={this.handleClick.bind(this,letGot)} key={i}>{String.fromCharCode(i)}</ReactBootstrap.Button>);
        }
        return a;
    };
render(){
    return(
        <div className="container buttonGroup">
        <ReactBootstrap.ButtonToolbar>
  <ReactBootstrap.ButtonGroup>
    <ReactBootstrap.Button onClick={this.handleClick.bind(this,"#")}>#</ReactBootstrap.Button>
      {this.genCharArray('A','Z')}
  </ReactBootstrap.ButtonGroup>
  </ReactBootstrap.ButtonToolbar>
            {this.state.showComponent ?
                <LetterResults letter={valuePassed} item={this.props.item} /> :
                null
            }
</div>
    );
}
}
export default ButtonGroup;