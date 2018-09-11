import React, { Component } from 'react';
import './Tabpane.css';
import {Alert, Col} from 'react-bootstrap';

class CustomAlert extends Component{
    render(){
        return(
            <div className={"alertHome"}>
                <Col xs={6}>
            <Alert bsStyle={"info"}>
                <strong>Hello there stranger!</strong> Click any of the buttons to show {this.props.for} according to Alphabetical order!
            </Alert>
                </Col>
            </div>
        )
    }
}
export default CustomAlert;