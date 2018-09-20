import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import {Popover}from 'react-bootstrap';
import './Tabpane.css';
import LetterResultsDetails from "./LetterResultsDetails";


const popoverBottom = (letter,item)=>(
    <Popover id="popover-positioned-bottom" style={{maxWidth:'none',width: 800}}>
        <LetterResultsDetails letter={letter} item={item}/>
    </Popover>
);
class ButtonGroupDetails extends Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.state={
            valuePassed:"",
            metaData:""
        }
    }

    handleClick(message) {
        let metapassed = this.props.metadata;
        this.setState({valuePassed: message,metaData:metapassed});
    }

    genCharArray(charA, charZ) {
        let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (i; i <= j; ++i) {
            let letGot = String.fromCharCode(i);
            a.push(<ReactBootstrap.OverlayTrigger trigger="focus" placement="bottom" overlay={popoverBottom(letGot,this.props.metadata)} key={i}>
                <ReactBootstrap.Button onClick={this.handleClick.bind(this, letGot)}
                                       >{String.fromCharCode(i)}</ReactBootstrap.Button></ReactBootstrap.OverlayTrigger>
            );
        }
        return a;
    };

    render() {
        //console.log(this.props.metadata);
        return (
            <div>
                <ReactBootstrap.ButtonToolbar>
                    <ReactBootstrap.ButtonGroup bsSize="small">
                        <ReactBootstrap.OverlayTrigger trigger="focus" placement="bottom" overlay={popoverBottom('char',this.props.metadata)}>
                            <ReactBootstrap.Button onClick={this.handleClick.bind(this, "#")}>#</ReactBootstrap.Button>
                        </ReactBootstrap.OverlayTrigger>
                        {this.genCharArray('A', 'Z')}
                    </ReactBootstrap.ButtonGroup>
                </ReactBootstrap.ButtonToolbar>
            </div>
        );
    }
}
export default ButtonGroupDetails;