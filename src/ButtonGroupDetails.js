import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './Tabpane.css';
import LetterResultsDetails from "./LetterResultsDetails";


const popoverBottom = (valuepassed, metadata)=>(
    <ReactBootstrap.Popover id="popover-positioned-bottom" style={{maxWidth: 'none', width: 600}}>
        <LetterResultsDetails letter={valuepassed} item={metadata}/>
    </ReactBootstrap.Popover>
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
            a.push(<ReactBootstrap.OverlayTrigger trigger="focus" placement="bottom" overlay={popoverBottom(this.state.valuePassed,this.state.metaData)} key={i}>
                <ReactBootstrap.Button onClick={this.handleClick.bind(this, letGot)}
                                       >{String.fromCharCode(i)}</ReactBootstrap.Button></ReactBootstrap.OverlayTrigger>
            );
        }
        return a;
    };

    render() {
        return (
            <div>
                <ReactBootstrap.ButtonToolbar>
                    <ReactBootstrap.ButtonGroup bsSize="small">
                        <ReactBootstrap.OverlayTrigger trigger="focus" placement="bottom" overlay={popoverBottom(this.state.valuePassed,this.state.metaData)}>
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