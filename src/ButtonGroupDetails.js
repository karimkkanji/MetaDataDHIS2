import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './Tabpane.css';
import LetterResultsDetails from "./LetterResultsDetails";

let valuePassed = "";
const popoverBottom=(
    <ReactBootstrap.Popover id="popover-positioned-bottom" style={{maxWidth:'none',width:600}}>
        <LetterResultsDetails letter={valuePassed} />
    </ReactBootstrap.Popover>
);

class ButtonGroupDetails extends Component {
    constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
}

handleClick(message) {
        valuePassed = message;
}
genCharArray(charA,charZ){
        let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (i; i <= j; ++i) {
            let letGot = String.fromCharCode(i);
            a.push( <ReactBootstrap.OverlayTrigger trigger="focus" placement="bottom" overlay={popoverBottom}>
                <ReactBootstrap.Button onClick={this.handleClick.bind(this,letGot)} key={i}>{String.fromCharCode(i)}</ReactBootstrap.Button></ReactBootstrap.OverlayTrigger>
            );
        }
        return a;
    };
render(){
    return(
        <div>
        <ReactBootstrap.ButtonToolbar>
  <ReactBootstrap.ButtonGroup bsSize="small">
      <ReactBootstrap.OverlayTrigger trigger="focus" placement="bottom" overlay={popoverBottom}>
    <ReactBootstrap.Button onClick={this.handleClick.bind(this,"#")}>#</ReactBootstrap.Button>
      </ReactBootstrap.OverlayTrigger>
      {this.genCharArray('A','Z')}
  </ReactBootstrap.ButtonGroup>
  </ReactBootstrap.ButtonToolbar>
</div>
    );
}
}
export default ButtonGroupDetails;