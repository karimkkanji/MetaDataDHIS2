import React, {Component} from 'react';
import {Row,Col,Panel,Label,Well,Dropdown,MenuItem,Glyphicon} from 'react-bootstrap';
import './Tabpane.css';
import ButtonGroupDetails from './ButtonGroupDetails';
class DetailsMore extends Component{
    render(){
        return(
            <div className={"detailsMoreBody container"}>
                <Row className="show-grid">
                    <Col xs={12} md={9}>
                        <Dropdown id="dropdown-custom-1">
                            <Dropdown.Toggle>
                                <Glyphicon glyph="print" />&nbsp;Print Metadata
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="super-colors">
                                <MenuItem eventKey="1">CSV</MenuItem>
                                <MenuItem eventKey="2">Excel</MenuItem>
                                <MenuItem eventKey="3">PDF</MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                            <div className={'buttongroupDetsmarg'}>
                            <ButtonGroupDetails />
                            </div>
                    </Col>
                    <Col xs={4} md={3}>
                        <Well><h5>Metadata Displayname</h5></Well>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <Panel>
                            <Panel.Body>
                                <h4>Metadata Displayname</h4>
                                <hr/>
                                <b>Version:</b><code>v1</code>
                                <hr/>
                                <h5>Related links</h5>
                                <ul type="none">
                                    <li><a>Useless Link</a></li>
                                    <li><a>Useless Link</a></li>
                                    <li><a>Useless Link</a></li>
                                </ul>
                                <hr/>
                                <h5>Tags</h5>
                                <Label bsStyle="default">Default</Label>{' '}
                                <Label bsStyle="primary">Primary</Label>{' '}
                                <Label bsStyle="success">Success</Label>
                                <hr/>
                                <h5>Numerator Description</h5>
                                <code>Numerator Description here</code>
                                <h5>Denominator Description</h5>
                                <code>Denominator Description here</code>
                            </Panel.Body>
                        </Panel>
                        <Panel>
                            <Panel.Body>Basic panel example</Panel.Body>
                        </Panel>
                    </Col>
                    <Col xs={12} md={8}>
                        <Panel>
                            <Panel.Body>
                                <Col xs={4} md={4} className={"text-right"}>
                                    <div style={{paddingRight:'20px',borderRight: '2px solid black'}}>
                               <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span><br/><br/>
                                <span className="text-primary">Item name</span>
                                    </div>
                                </Col>
                                <Col xs={8} md={8}>
                                    <span >Item name</span ><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span><br/><br/>
                                    <span >Item name</span>
                                </Col>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>

            </div>
        );
    }
}
export default DetailsMore;