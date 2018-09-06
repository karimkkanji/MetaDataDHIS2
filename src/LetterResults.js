import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';
import {Label} from 'react-bootstrap';
import {ListGroupItem} from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './Tabpane.css';

class LetterResults extends Component {
    render(){
    return (
        <div className="container letterResults">
    <ListGroup>
  <ListGroupItem header={this.props.letter} href="#">
      <ButtonToolbar bsClass="pull-right">
          <ButtonGroup>
              <Button>View</Button>
          </ButtonGroup>&nbsp;
          <ButtonGroup>
              <Button>Print</Button>
          </ButtonGroup>&nbsp;
          <ButtonGroup>
              <Button>Share</Button>
          </ButtonGroup>
      </ButtonToolbar>
      Item Description<br/>
  <Label bsStyle="default">Danger</Label> <Label bsStyle="info">Danger</Label>
  </ListGroupItem>
  <ListGroupItem header={this.props.letter}  href="#" >
      <ButtonToolbar bsClass="pull-right">
          <ButtonGroup>
              <Button>View</Button>
          </ButtonGroup>&nbsp;
          <ButtonGroup>
              <Button>Print</Button>
          </ButtonGroup>&nbsp;
          <ButtonGroup>
              <Button>Share</Button>
          </ButtonGroup>
      </ButtonToolbar>
  Item Description<br/>
  <Label bsStyle="success">Danger</Label> <Label bsStyle="warning">Danger</Label>
  </ListGroupItem>
  <ListGroupItem header={this.props.letter}  href="#">
      <ButtonToolbar bsClass="pull-right">
          <ButtonGroup>
              <Button>View</Button>
          </ButtonGroup>&nbsp;
          <ButtonGroup>
              <Button>Print</Button>
          </ButtonGroup>&nbsp;
          <ButtonGroup>
              <Button>Share</Button>
          </ButtonGroup>
      </ButtonToolbar>
  Item Description<br/>
  <Label bsStyle="primary">Primary</Label> <Label bsStyle="danger">Danger</Label>
  </ListGroupItem>
  <ListGroupItem header={this.props.letter}  href="#">
            <ButtonToolbar bsClass="pull-right">
                <ButtonGroup>
                    <Button>View</Button>
                </ButtonGroup>&nbsp;
                <ButtonGroup>
                    <Button>Print</Button>
                </ButtonGroup>&nbsp;
                <ButtonGroup>
                    <Button>Share</Button>
                </ButtonGroup>
            </ButtonToolbar>
            Item Description<br/>
            <Label bsStyle="primary">Primary</Label> <Label bsStyle="danger">Danger</Label>
        </ListGroupItem>
</ListGroup>
</div>
    );
}
}
export default LetterResults;