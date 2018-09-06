import React, { Component } from 'react';
import './Tabpane.css';
import {Nav, NavItem,Col,Row, Tab} from 'react-bootstrap';
import ButtonGroup from "./ButtonGroup";
import './Tabpane.css';
import Alert from './Alert';
import LetterResults from './LetterResults';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const BasicExample = () => (
    <Router>
        <div>
            <Route exact path="/" component={Start} />
            <Route path="/programs" component={Start} />
            <Route path="/dataelements" component={Start} />
            <Route path="/datasets" component={Start} />
            <Route path="/indicators" component={Start} />
            <Route path="/:getVal/:getLetter" component={Letter} />
        </div>
    </Router>
);
const Start = () => {
    return <Alert title="Hello there!" message="Click any letter here to see the definitons" />
};
const Letter = ({match}) => {
    return <LetterResults letter={match.params.getLetter}/>
};
class Tabpane extends Component {
    render() {
    return (
      <div className="tabpanebody">
      <div className="container">
          <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
              <Row className="clearfix">
                  <Col sm={12}>
                      <Nav bsStyle="tabs">
                          <NavItem eventKey="first">Datasets</NavItem>
                          <NavItem eventKey="second">Indicators</NavItem>
                          <NavItem eventKey="third">Programs</NavItem>
                          <NavItem eventKey="fourth">Data Elements</NavItem>
                      </Nav>
                  </Col>
                  <Col sm={12}>
                      <div className={"container content"}>
                      <Tab.Content animation>
                          <Tab.Pane eventKey="first"><ButtonGroup/></Tab.Pane>
                          <Tab.Pane eventKey="second"><ButtonGroup/></Tab.Pane>
                          <Tab.Pane eventKey="third"><ButtonGroup/></Tab.Pane>
                          <Tab.Pane eventKey="fourth"><ButtonGroup/></Tab.Pane>
                      </Tab.Content>
                       </div>
                  </Col>
              </Row>
          </Tab.Container>
        </div>
      </div>

    );
  }
}

export default Tabpane;