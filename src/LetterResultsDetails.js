import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';
import {Label} from 'react-bootstrap';
import {ListGroupItem} from 'react-bootstrap';
import './Tabpane.css';

class LetterResultsDetails extends Component {
    render(){
    return (
        <div>
    <ListGroup>
  <ListGroupItem header={this.props.letter} href="#">
      Item Description<br/>
  <Label bsStyle="default">Danger</Label> <Label bsStyle="info">Danger</Label>
  </ListGroupItem>
  <ListGroupItem header={this.props.letter}  href="#" >
  Item Description<br/>
  <Label bsStyle="success">Danger</Label> <Label bsStyle="warning">Danger</Label>
  </ListGroupItem>
  <ListGroupItem header={this.props.letter}  href="#">

  Item Description<br/>
  <Label bsStyle="primary">Primary</Label> <Label bsStyle="danger">Danger</Label>
  </ListGroupItem>
  <ListGroupItem header={this.props.letter}  href="#">
            Item Description<br/>
            <Label bsStyle="primary">Primary</Label> <Label bsStyle="danger">Danger</Label>
        </ListGroupItem>
</ListGroup>
</div>
    );
}
}
export default LetterResultsDetails;