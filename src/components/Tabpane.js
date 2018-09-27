import React, {Component} from 'react';
import './Tabpane.css';
import {Nav, NavItem, Col, Row, Tab} from 'react-bootstrap';
import ButtonGroupNav from "./ButtonGroupNav";
import './Tabpane.css';
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
                                    <NavItem eventKey="fifth">Program Data Elements</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={12}>
                                <div className={"container content"}>
                                    <Tab.Content animation>
                                        <Tab.Pane eventKey="first"><ButtonGroupNav item={"datasets"}/></Tab.Pane>
                                        <Tab.Pane eventKey="second"><ButtonGroupNav item={"indicators"}/></Tab.Pane>
                                        <Tab.Pane eventKey="third"><ButtonGroupNav item={"programs"}/></Tab.Pane>
                                        <Tab.Pane eventKey="fourth"><ButtonGroupNav item={"dataelements"}/></Tab.Pane>
                                        <Tab.Pane eventKey="fifth"><ButtonGroupNav item={"programdataelements"}/></Tab.Pane>
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