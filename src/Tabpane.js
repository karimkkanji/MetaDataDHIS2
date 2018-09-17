import React, {Component} from 'react';
import './Tabpane.css';
import {Nav, NavItem, Col, Row, Tab} from 'react-bootstrap';
import ButtonGroup from "./ButtonGroup";
import './Tabpane.css';

class Tabpane extends Component {
    constructor(props) {
        super(props);
        this.handleChangeState = this.handleChangeState.bind(this);
    }

    handleChangeState(message) {
        this.InputChange(message);
    }

    InputChange = (params) => {
        this.props.changeHandler(params);
    };

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
                                    <NavItem eventKey="third">Program Data Elements</NavItem>
                                    <NavItem eventKey="fourth">Data Elements</NavItem>
                                </Nav>
                            </Col>
                            <Col sm={12}>
                                <div className={"container content"}>
                                    <Tab.Content animation>
                                        <Tab.Pane eventKey="first"><ButtonGroup item={"datasets"} stateHandler={this.props.dataSets}/></Tab.Pane>
                                        <Tab.Pane eventKey="second"><ButtonGroup item={"indicators"}/></Tab.Pane>
                                        <Tab.Pane eventKey="third"><ButtonGroup item={"programs"}/></Tab.Pane>
                                        <Tab.Pane eventKey="fourth"><ButtonGroup item={"dataelements"}/></Tab.Pane>
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