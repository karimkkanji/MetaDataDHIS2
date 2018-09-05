import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './Tabpane.css';

class Alert extends Component{
    render(){
        return(
            <div className="container">
              <div className="col-sm-6 alertHome">
            <ReactBootstrap.Alert bsStyle="info">
  <strong>{this.props.title}</strong> {this.props.message}
</ReactBootstrap.Alert>
</div>
</div>
        );
    }
}
export default Alert;