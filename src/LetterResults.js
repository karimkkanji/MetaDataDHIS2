import React, {Component} from 'react';
import {
    Col,
    ListGroup,
    Label,
    ButtonGroup,
    ButtonToolbar,
    Button,
    Alert,
    PanelGroup,
    Panel,
    Glyphicon,
    Row, MenuItem, Dropdown
} from 'react-bootstrap';
import './Tabpane.css';
let output = "";
const headers = {
    headers: {
        'Authorization': `Basic ${btoa('evanpersie3@gmail.com:skolastikA97')}`
        //'Authorization': `Basic ${btoa('admin:district')}`
    }
};

class LetterResults extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            data: [],
            filterText: ''
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        //let filters = this.state.filterText
        //http://197.136.81.99:8082/test/api/programDataElements.json?fields=:all&paging=false  ---- default
        let item = this.props.item;

        if (item === "programs") {
            fetch(`http://197.136.81.99:8082/test/api/programDataElements.json?fields=:all&paging=false`, headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the inpu
                    this.setState({
                        data: findresponse.programDataElements, isLoading: false
                    })
                })
        }
        else if (this.props.item === "datasets") {
            fetch('http://197.136.81.99:8082/test/api/dataSets.json?fields=:all&paging=false', headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the input
                    this.setState({
                        data: findresponse.dataSets, isLoading: false
                    })
                })
        }
        else if (this.props.item === "indicators") {
            fetch('http://197.136.81.99:8082/test/api/indicators.json?fields=:all&paging=false', headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the input
                    this.setState({
                        data: findresponse.indicators, isLoading: false
                    })
                })
        }
        else if (this.props.item === "dataelements") {
            fetch('http://197.136.81.99:8082/test/api/dataElements.json?fields=:all&paging=false', headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the input
                    console.log(findresponse.dataElements); //hapa ndio jackpot
                    this.setState({
                        data: findresponse.dataElements, isLoading: false
                    })
                })
        }
    }

    render() {
        const {isLoading} = this.state;
        /*This allows a loader to show while data is being loaded to states, once loaded, the state will change to true then rendering will occur*/
        if (isLoading) {
            return <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>;
        }
        if (this.state.data.filter((dynamicData) => {
            return dynamicData.name[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
        }).length === 0) {
            //select items that start with a non-letter character
            if (this.props.letter === "#") {
                output = this.state.data
                    .filter((dynamicData) => {
                        //console.log(dynamicData.name)
                        if (dynamicData.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                            return dynamicData.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                        }
                        else{
                            return undefined;
                        }
                    })
                    .map((dynamicData) => (
                        <div key={dynamicData.id}>
                            <PanelGroup accordion>
                                <Panel eventKey={dynamicData.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down" />
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{dynamicData.name}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button href={"/"+this.props.item+"/"+dynamicData.id}>More</Button>
                                                </ButtonGroup>&nbsp;
                                                <Dropdown id="dropdown-custom-1">
                                                    <Dropdown.Toggle>
                                                        <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="super-colors">
                                                        <MenuItem eventKey="1" href={dynamicData.href+".csv"}>CSV</MenuItem>
                                                        <MenuItem eventKey="2" href={dynamicData.href+".xlsx"}>Excel</MenuItem>
                                                        <MenuItem eventKey="3" href={dynamicData.href+".pdf"}>PDF</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>&nbsp;
                                                <ButtonGroup>
                                                    <Button> <Glyphicon glyph="share" /> Share</Button>
                                                </ButtonGroup>&nbsp;
                                                <ButtonGroup>
                                                    <Button> <Glyphicon glyph="pencil" /> Edit</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <Label bsStyle="default" style={{marginLeft:10}}>{dynamicData.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{dynamicData.formType}</Label>&nbsp;
                                            <Label
                                                bsStyle={"primary"}>{this.props.item === "indicators"?"Numerator: ":null}{dynamicData.numeratorDescription}
                                            </Label>&nbsp;
                                            <Label
                                                bsStyle={"danger"}>{this.props.item === "indicators"?"Denominator: ":null}{dynamicData.denominatorDescription}
                                            </Label>&nbsp;
                                            <Label bsStyle={"primary"}>{dynamicData.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{dynamicData.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{dynamicData.aggregationType}</Label><br/>
                                        </Row>
                                        {(dynamicData.description===undefined)?<div style={{color:"#ff0000"}}>No description provided.</div>:dynamicData.description}
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </div>
                    ));
            }
            //if no items are found return an alert
            else {
                output = <Alert bsStyle={"warning"}><strong>No records found!</strong> There is no metadata that starts
                    with <strong><i>{this.props.letter}</i></strong></Alert>
            }
        }
        else {
            output = this.state.data
                .filter((dynamicData) => {
                    //console.log(dynamicData.name)
                    return dynamicData.name[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
                })
                .map((dynamicData) => (
                    <div key={dynamicData.id}><Col xs={11} md={11}>
                        <PanelGroup accordion id={dynamicData.name}>
                            <Panel eventKey={dynamicData.id} bsStyle="info">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                            <ButtonGroup>
                                                <Glyphicon glyph="chevron-down" />
                                            </ButtonGroup>&nbsp;
                                        </ButtonToolbar>
                                        <p>{dynamicData.name}</p>

                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <Row>
                                        <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                            <ButtonGroup>
                                                <Button href={"/"+this.props.item+"/"+dynamicData.id}>More</Button>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1" href={dynamicData.href+".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2" href={dynamicData.href+".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3" href={dynamicData.href+".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="share" /> Share</Button>
                                            </ButtonGroup>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="pencil" /> Edit</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                        <Label bsStyle="default" style={{marginLeft:10}}>{dynamicData.periodType}</Label>&nbsp;
                                        <Label bsStyle="info">{dynamicData.formType}</Label>&nbsp;
                                        <Label
                                            bsStyle={"primary"}>{this.props.item === "indicators"?"Numerator: ":null}{dynamicData.numeratorDescription}
                                        </Label>&nbsp;
                                        <Label
                                            bsStyle={"danger"}>{this.props.item === "indicators"?"Denominator: ":null}{dynamicData.denominatorDescription}
                                        </Label>&nbsp;
                                        <Label bsStyle={"primary"}>{dynamicData.domainType}</Label>&nbsp;
                                        <Label bsStyle={"success"}>{dynamicData.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>{dynamicData.aggregationType}</Label><br/>
                                    </Row>
                                    {(dynamicData.description===undefined)?<div style={{color:"#ff0000"}}>No description provided.</div>:dynamicData.description}
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                    </Col>
                    </div>
                ));
        }
        return (
            <div className="container letterResults">
                <Col xs={11} md={11}>
                    <ListGroup>
                        {output.length !== 0 ? output :
                            <div><Col xs={6}><Alert bsStyle={"warning"}><strong>No records found!</strong> There is no
                                metadata that starts with a number or symbol</Alert></Col></div>}
                    </ListGroup>
                </Col>
            </div>
        );
    }
}

export default LetterResults;