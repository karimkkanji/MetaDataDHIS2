import React, {Component} from 'react';
import {
    Alert,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Col,
    Dropdown,
    Glyphicon,
    Label,
    ListGroup,
    MenuItem,
    Modal,
    Panel,
    PanelGroup,
    Row
} from 'react-bootstrap';
import {Link} from "react-router-dom"
import './Tabpane.css';
import connect from "react-redux/es/connect/connect";
import {fetchPrograms} from "../actions/programActions";
import {fetchDataSets} from "../actions/datasetActions";
import {fetchDataElements} from "../actions/dataelementsActions";
import {fetchIndicators} from "../actions/indicatorActions";
import config from '../actions/config';
import {Offline, Online} from "react-detect-offline";
const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username + ":" + config.password)}`
    }
};
class LetterResults extends Component {
    handledescriptionChange = (e) => {
        this.setState({description: e.target.value});
        console.log(e.target.value);
    };

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        /*this.updateRecord = this.updateRecord.bind(this);*/
        this.state = {
            isloading: false,
            show: false,
            itemType: "",
            description: "",
            descriptionView: "",
            name: "",
            id: "",
            aggregationType: "",
            domainType: "",
            valueType: "",
            shortName: "",
            periodType: "",
            indicatorType: "",
            numerator: "",
            denominator: "",
            shortname: "",
            programType: "",
            updated: 0
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchPrograms());
        this.props.dispatch(fetchIndicators());
        this.props.dispatch(fetchDataSets());
        this.props.dispatch(fetchDataElements());
    }

    handleClose() {
        this.setState({show: false, isLoading: false});
    }

    handleShow(id, description, name, aggregationType, domainType, valueType, shortName) {
        this.setState({
            isLoading: true,
            show: true,
            itemType: "de",
            descriptionView: description,
            description: description,
            id: id,
            name: name,
            aggregationType: aggregationType,
            domainType: domainType,
            valueType: valueType,
            shortName: shortName
        });
    }

    handleShowdatasets(id, description, name, periodType) {
        this.setState({
            isLoading: true,
            show: true,
            itemType: "ds",
            descriptionView: description,
            description: description,
            id: id,
            name: name,
            periodType: periodType
        });
    }

    handleShowindicators(id, description, name, indicatorType, numerator, denominator, shortname) {
        this.setState({
            isLoading: true,
            show: true,
            itemType: "indi",
            descriptionView: description,
            description: description,
            id: id,
            name: name,
            indicatorType: indicatorType.id,
            numerator: numerator,
            denominator: denominator,
            shortname: shortname
        }, console.log("numer:" + this.state.numerator + " denom:" + this.state.denominator));
    }

    handleShowprograms(id, description, name, programType, shortname,) {
        console.log(programType);
        this.setState({
            isLoading: true,
            show: true,
            itemType: "prog",
            descriptionView: description,
            description: description,
            id: id,
            name: name,
            programType: programType,
            shortName: shortname
        });
    }

    update(itemType) {
        let placeholder = "", headerPlace = "";
        switch (itemType) {
            case "de" :
                placeholder = JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    aggregationType: this.state.aggregationType,
                    domainType: this.state.domainType,
                    valueType: this.state.valueType,
                    shortName: this.state.shortName
                });
                headerPlace = "dataElements/";

                break;
            case "prog":
                placeholder = JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    shortName: this.state.shortName,
                    programType: this.state.programType

                });

                headerPlace = "programs/";
                break;
            case "ds":
                placeholder = JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    periodType: this.state.periodType
                });
                headerPlace = "dataSets/";
                break;
            case "indi":
                placeholder = JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    indicatorType: {"id": this.state.indicatorType},
                    numerator: this.state.numerator,
                    denominator: this.state.denominator,
                    shortName: this.state.shortname
                });
                headerPlace = "indicators/";
                break;
            default:
                placeholder = undefined;
                headerPlace = undefined;
        }
        fetch(config.url + headerPlace + this.state.id, {
            method: 'PUT',
            body: placeholder,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Basic ${btoa(config.username + ":" + config.password)}`
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.httpStatusCode === 200) {
                    this.setState({updated: 1, descriptionView: this.state.description});
                }
                else {
                    this.setState({updated: 2});
                }
            });
        //window.alert("Updated");
        //this.handleClose();
    }

    getDataSets() {
        //console.log('received DataSets',this.props.dataSets)
        //add returning functions here
        if (this.props.dataSets) {
            return this.props.dataSets
                .filter((dataset) => {
                    //console.log(dynamicData.name)
                    return dataset.displayName[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
                })
                .map((dataset) => {
                    return (
                        <div key={dataset.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={dataset.displayName}>
                                <Panel eventKey={dataset.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{dataset.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                <Link
                                                    to={"/" + this.props.item + "/" + dataset.id}><Button>More </Button>
                                                </Link>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1"
                                                              href={dataset.href + ".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2"
                                                              href={dataset.href + ".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3"
                                                              href={dataset.href + ".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button disabled={this.state.isLoading}
                                                        onClick={this.handleShowdatasets.bind(this, dataset.id, dataset.description, dataset.name, dataset.periodType)}>{this.state.isLoading ?
                                                    <div className="lds-dual-ring"/> :
                                                    <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Row>
                                        <hr/>
                                        <h6>Description:</h6>
                                        <h3>{(dataset.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataset.description}</h3>
                                        <hr/>
                                        <h6>Quick info:</h6><Label bsStyle="default"
                                                                   style={{marginLeft: 10}}>Period
                                        Type: {dataset.periodType}</Label>&nbsp;
                                        <Label bsStyle="info">Form Type: {dataset.formType}</Label>&nbsp;
                                        {/*<Label bsStyle={"primary"}>Domain Type: {dataset.domainType}</Label>&nbsp;
                                        <Label bsStyle={"success"}>Value Type: {dataset.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>Aggregation Type: {dataset.aggregationType}</Label><br/>*/}
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else {
            return (
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </Online>
                    <Offline>
                        <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
                    </Offline>
                </div>
            );
        }
    }

    getPrograms() {
        //console.log('received programs',this.props.programs)
        if (this.props.programs) {
            return this.props.programs
                .filter((program) => {
                    //console.log(dynamicData.name)
                    return program.displayName[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
                })
                .map((program) => {
                    return (
                        <div key={program.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={program.displayName}>
                                <Panel eventKey={program.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{program.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                <Link
                                                    to={"/" + this.props.item + "/" + program.id}><Button>More </Button>
                                                </Link>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1"
                                                              href={program.href + ".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2"
                                                              href={program.href + ".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3"
                                                              href={program.href + ".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="share"/> Share</Button>
                                            </ButtonGroup>&nbsp;
                                            <ButtonGroup>
                                                <Button disabled={this.state.isLoading}
                                                        onClick={this.handleShowprograms.bind(this, program.id, program.description, program.name, program.programType, program.shortName)}>{this.state.isLoading ?
                                                    <div className="lds-dual-ring"/> :
                                                    <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Row>
                                        <hr/>
                                        <h6>Description:</h6><h3>{(program.description === undefined) ?
                                        <div style={{color: "#ff0000"}}>No description
                                            provided.</div> : program.description}</h3>
                                        <hr/>
                                        <h6>Quick info:</h6><Label bsStyle="default"
                                                                   style={{marginLeft: 10}}>{program.periodType}</Label>&nbsp;
                                        <Label bsStyle="info">Program Type: {program.programType}</Label>&nbsp;
                                        <Label bsStyle={"primary"}>{program.domainType}</Label>&nbsp;
                                        <Label bsStyle={"success"}>{program.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>{program.aggregationType}</Label><br/>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else {
            return (
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </Online>
                    <Offline>
                        <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
                    </Offline>
                </div>
            );
        }
    }

    getIndicators() {
        if (this.props.indicators) {
            return this.props.indicators
                .filter((indicator) => {
                    //console.log(dynamicData.name)
                    return indicator.displayName[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
                })
                .map((indicator) => {
                    return (
                        <div key={indicator.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={indicator.displayName}>
                                <Panel eventKey={indicator.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{indicator.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                <Link
                                                    to={"/" + this.props.item + "/" + indicator.id}><Button>More </Button>
                                                </Link>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1"
                                                              href={indicator.href + ".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2"
                                                              href={indicator.href + ".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3"
                                                              href={indicator.href + ".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="share"/> Share</Button>
                                            </ButtonGroup>&nbsp;
                                            <ButtonGroup>
                                                <Button disabled={this.state.isLoading}
                                                        onClick={this.handleShowindicators.bind(this, indicator.id, indicator.description, indicator.name, indicator.indicatorType, indicator.numerator, indicator.denominator, indicator.shortName)}>{this.state.isLoading ?
                                                    <div className="lds-dual-ring"/> :
                                                    <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Row>
                                        <hr/>
                                        <h6>Description:</h6><h3>{(indicator.description === undefined) ?
                                        <div style={{color: "#ff0000"}}>No description
                                            provided.</div> : indicator.description}</h3>
                                        <hr/>
                                        <h6>Quick info:</h6><Label bsStyle="default"
                                                                   style={{marginLeft: 10}}>{indicator.periodType}</Label>&nbsp;
                                        <Label bsStyle="info">{indicator.formType}</Label>&nbsp;
                                        <Label
                                            bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{indicator.numeratorDescription}
                                        </Label>&nbsp;
                                        <Label
                                            bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{indicator.denominatorDescription}
                                        </Label>&nbsp;
                                        <Label bsStyle={"primary"}>{indicator.domainType}</Label>&nbsp;
                                        <Label bsStyle={"success"}>{indicator.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>{indicator.aggregationType}</Label><br/>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else {
            return (
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </Online>
                    <Offline>
                        <Alert bsStyle={"danger"}>You are offline. Check your Internet connection and try again!</Alert>
                    </Offline>
                </div>
            );
        }

    }

    getDataElements() {
        //console.log('received DataElements',this.props.dataElements)
        //console.log('received DataSets',this.props.dataSets)
        if (this.props.dataElements) {
            //add returning functions here
            return this.props.dataElements
                .filter((dataElements) => {
                    //console.log(dynamicData.name)
                    return dataElements.displayName[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
                })
                .map((dataElements) => {
                    return (
                        <div key={dataElements.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={dataElements.displayName}>
                                <Panel eventKey={dataElements.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{dataElements.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                <Link
                                                    to={"/" + this.props.item + "/" + dataElements.id}><Button>More </Button>
                                                </Link>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1"
                                                              href={dataElements.href + ".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2"
                                                              href={dataElements.href + ".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3"
                                                              href={dataElements.href + ".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="share"/> Share</Button>
                                            </ButtonGroup>&nbsp;
                                            <ButtonGroup>
                                                <Button disabled={this.state.isLoading}
                                                        onClick={this.handleShow.bind(this, dataElements.id, dataElements.description, dataElements.name, dataElements.periodType)}>{this.state.isLoading ?
                                                    <div className="lds-dual-ring"/> :
                                                    <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Row>
                                        <hr/>
                                        <h6>Description:</h6><h3>{(dataElements.description === undefined) ?
                                        <div style={{color: "#ff0000"}}>No description
                                            provided.</div> : dataElements.description}</h3>
                                        <hr/>
                                        <h6>Quick info:</h6><Label bsStyle={"primary"}>Domain
                                        Type: {dataElements.domainType}</Label>&nbsp;
                                        <Label bsStyle={"success"}>Value Type: {dataElements.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>Aggregation Type: {dataElements.aggregationType}</Label><br/>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else {
            return (
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </Online>
                    <Offline>
                        <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
                    </Offline>
                </div>
            );
        }
        //add returning functions here
    }

    getProgramsMixed() {
        //console.log('received programs',this.props.programs)
        if (this.props.programs) {
            return this.props.programs
                .filter((program) => {
                    if (program.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return program.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else {
                        return undefined;
                    }
                    //console.log(dynamicData.name)
                })
                .map((program) => {
                    return (
                        <div key={program.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={program.displayName}>
                                <Panel eventKey={program.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{program.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                <Link
                                                    to={"/" + this.props.item + "/" + program.id}><Button>More </Button>
                                                </Link>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1"
                                                              href={program.href + ".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2"
                                                              href={program.href + ".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3"
                                                              href={program.href + ".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="share"/> Share</Button>
                                            </ButtonGroup>&nbsp;
                                            <ButtonGroup>
                                                <Button disabled={this.state.isLoading}
                                                        onClick={this.handleShowprograms.bind(this, program.id, program.description, program.name, program.periodType)}>{this.state.isLoading ?
                                                    <div className="lds-dual-ring"/> :
                                                    <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Row>
                                        <hr/>
                                        <h6>Description:</h6><h3>{(program.description === undefined) ?
                                        <div style={{color: "#ff0000"}}>No description
                                            provided.</div> : program.description}</h3>
                                        <hr/>
                                        <h6>Quick info:</h6><Label bsStyle="default"
                                                                   style={{marginLeft: 10}}>{program.periodType}</Label>&nbsp;
                                        <Label bsStyle="info">{program.formType}</Label>&nbsp;
                                        <Label
                                            bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{program.numeratorDescription}
                                        </Label>&nbsp;
                                        <Label
                                            bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{program.denominatorDescription}
                                        </Label>&nbsp;
                                        <Label bsStyle="info">Program Type: {program.programType}</Label>&nbsp;
                                        <Label bsStyle={"primary"}>{program.domainType}</Label>&nbsp;
                                        <Label bsStyle={"success"}>{program.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>{program.aggregationType}</Label><br/>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else {
            return (
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </Online>
                    <Offline>
                        <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
                    </Offline>
                </div>
            )
        }
    }

    getIndicatorsMixed() {
        //console.log('received indicators',this.props.indicators)

        //add returning functions here

        if (this.props.indicators) {
            return this.props.indicators
                .filter((indicator) => {
                    //console.log(dynamicData.name)
                    if (indicator.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return indicator.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else {
                        return undefined;
                    }
                })
                .map((indicator) => {
                    /*
                    let expression = indicator.numerator;
                    expression = expression.replace(/#/g, "%23");
                    expression = expression.replace(/{/g, "%7B");
                    expression = expression.replace(/}/g, "%7D");
                    expression = expression.replace(/\s/g, "%20");
                    expression = expression.replace(/\+/g, "%2B");
                    fetch('http://197.136.81.99:8082/test/api/26/expressions/description.json?expression=' + expression, headers)
                        .then(
                            function (response) {
                                return response.json();
                            }
                        ).then(function (jsonData) {
                        //handle json data processing here
                       mydata = jsonData.description;
                    });
                    */
                    return (
                        <div key={indicator.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={indicator.displayName}>
                                <Panel eventKey={indicator.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{indicator.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                <Link
                                                    to={"/" + this.props.item + "/" + indicator.id}><Button>More </Button>
                                                </Link>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1"
                                                              href={indicator.href + ".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2"
                                                              href={indicator.href + ".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3"
                                                              href={indicator.href + ".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="share"/> Share</Button>
                                            </ButtonGroup>&nbsp;
                                            <ButtonGroup>
                                                <Button disabled={this.state.isLoading}
                                                        onClick={this.handleShowindicators.bind(this, indicator.id, indicator.description, indicator.name, indicator.indicatorType, indicator.numerator, indicator.denominator, indicator.shortName)}>{this.state.isLoading ?
                                                    <div className="lds-dual-ring"/> :
                                                    <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Row>
                                        <hr/>
                                        <h6>Description:</h6><h3>{(indicator.description === undefined) ?
                                        <div style={{color: "#ff0000"}}>No description
                                            provided.</div> : indicator.description}</h3>
                                        <hr/>
                                        <h6>Quick info:</h6><Label bsStyle="default"
                                                                   style={{marginLeft: 10}}>{indicator.periodType}</Label>&nbsp;
                                        <Label bsStyle="info">{indicator.formType}</Label>&nbsp;
                                        <Label
                                            bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{indicator.numeratorDescription}
                                        </Label>&nbsp;
                                        <Label
                                            bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{indicator.denominatorDescription}
                                        </Label>&nbsp;
                                        <Label bsStyle={"primary"}>{indicator.domainType}</Label>&nbsp;
                                        <Label bsStyle={"success"}>{indicator.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>{indicator.aggregationType}</Label><br/>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else {
            return (
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </Online>
                    <Offline>
                        <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
                    </Offline>
                </div>
            );
        }

    }

    getDataSetsMixed() {
        //console.log('received DataSets',this.props.dataSets)

        //add returning functions here
        if (this.props.dataSets) {
            return this.props.dataSets
                .filter((dataset) => {
                    //console.log(dynamicData.name)
                    if (dataset.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return dataset.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else {
                        return undefined;
                    }
                })
                .map((dataset) => {
                    return (
                        <div key={dataset.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={dataset.displayName}>
                                <Panel eventKey={dataset.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{dataset.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                <Link
                                                    to={"/" + this.props.item + "/" + dataset.id}><Button>More </Button>
                                                </Link>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1"
                                                              href={dataset.href + ".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2"
                                                              href={dataset.href + ".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3"
                                                              href={dataset.href + ".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="share"/> Share</Button>
                                            </ButtonGroup>&nbsp;
                                            <ButtonGroup>
                                                <Button disabled={this.state.isLoading}
                                                        onClick={this.handleShowdatasets.bind(this, dataset.id, dataset.description, dataset.name, dataset.periodType)}>{this.state.isLoading ?
                                                    <div className="lds-dual-ring"/> :
                                                    <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Row>
                                        <hr/>
                                        <h6>Description:</h6><h3>{(dataset.description === undefined) ?
                                        <div style={{color: "#ff0000"}}>No description
                                            provided.</div> : dataset.description}</h3>
                                        <hr/>
                                        <h6>Quick info:</h6><Label bsStyle="default"
                                                                   style={{marginLeft: 10}}>Period
                                        Type: {dataset.periodType}</Label>&nbsp;
                                        <Label bsStyle="info">Form Type: {dataset.formType}</Label>&nbsp;
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else {
            return (
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </Online>
                    <Offline>
                        <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
                    </Offline>
                </div>
            );
        }
    }

    getDataElementsMixed() {
        //console.log('received DataElements',this.props.dataElements)
        //console.log('received DataSets',this.props.dataSets)
        if (this.props.dataElements) {
            //add returning functions here
            return this.props.dataElements
                .filter((dataElements) => {
                    //console.log(dynamicData.name)
                    if (dataElements.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return dataElements.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else {
                        return undefined;
                    }
                })
                .map((dataElements) => {
                    return (
                        <div key={dataElements.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={dataElements.displayName}>
                                <Panel eventKey={dataElements.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{dataElements.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                                        <ButtonToolbar>
                                            <ButtonGroup>
                                                <Link
                                                    to={"/" + this.props.item + "/" + dataElements.id}><Button>More </Button>
                                                </Link>
                                            </ButtonGroup>&nbsp;
                                            <Dropdown id="dropdown-custom-1">
                                                <Dropdown.Toggle>
                                                    <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="super-colors">
                                                    <MenuItem eventKey="1"
                                                              href={dataElements.href + ".csv"}>CSV</MenuItem>
                                                    <MenuItem eventKey="2"
                                                              href={dataElements.href + ".xlsx"}>Excel</MenuItem>
                                                    <MenuItem eventKey="3"
                                                              href={dataElements.href + ".pdf"}>PDF</MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>&nbsp;
                                            <ButtonGroup>
                                                <Button> <Glyphicon glyph="share"/> Share</Button>
                                            </ButtonGroup>&nbsp;
                                            <ButtonGroup>
                                                <Button disabled={this.state.isLoading}
                                                        onClick={this.handleShow.bind(this, dataElements.id, dataElements.description, dataElements.name, dataElements.periodType)}>{this.state.isLoading ?
                                                    <div className="lds-dual-ring"/> :
                                                    <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Row>
                                        <hr/>
                                        <h6>Description:</h6><h3>{(dataElements.description === undefined) ?
                                        <div style={{color: "#ff0000"}}>No description
                                            provided.</div> : dataElements.description}</h3>
                                        <hr/>
                                        <h6>Quick info:</h6><Label bsStyle={"primary"}>Domain
                                        Type: {dataElements.domainType}</Label>&nbsp;
                                        <Label bsStyle={"success"}>Value Type: {dataElements.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>Aggregation Type: {dataElements.aggregationType}</Label><br/>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else {
            return (
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </Online>
                    <Offline>
                        <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
                    </Offline>
                </div>
            );
        }
        //add returning functions here
    }

    render() {
        let output = "";
        if (this.props.letter === "#") {
            if (this.props.item === "programs") {
                output = this.getProgramsMixed();
            }
            else if (this.props.item === "datasets") {
                output = this.getDataSetsMixed();
            }
            else if (this.props.item === "indicators") {
                output = this.getIndicatorsMixed();
            }
            else if (this.props.item === "dataelements") {
                output = this.getDataElementsMixed();
            }
        }
        else {
            if (this.props.item === "programs") {
                output = this.getPrograms();
            }
            else if (this.props.item === "datasets") {
                output = this.getDataSets();
            }
            else if (this.props.item === "indicators") {
                output = this.getIndicators();
            }
            else if (this.props.item === "dataelements") {
                output = this.getDataElements();
            }
        }
        return (
            <div className="container letterResults">
                <Col xs={11} md={11}>
                    <ListGroup>
                        {output.length !== 0 ? output :
                            <div><Col xs={6} md={6}><Alert bsStyle={"warning"}><strong>No records found!</strong> There
                                is no
                                metadata that starts <strong>{this.props.letter}</strong></Alert></Col></div>}
                    </ListGroup>
                </Col>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.updated === 1 ?
                            <Alert bsStyle={"success"}>The Description has been updated successfully <Glyphicon
                                glyph={"ok"} className={"pull-right"}/></Alert> : null}
                        {this.state.updated === 2 ?
                            <Alert bsStyle={"danger"}>Could not update the description <Glyphicon glyph={"remove"}
                                                                                                  className={"pull-right"}/></Alert> : null}
                        <h4>Current Description:</h4>
                        {(this.state.descriptionView === undefined) ?
                            <div style={{color: "#ff0000"}}>No description
                                provided.</div> : this.state.description}<br/>
                        <h4>New Description</h4>
                        <textarea placeholder={"Type new description here..."} className="form-control"
                                  onBlur={this.handledescriptionChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle={"warning"} onClick={this.update.bind(this, this.state.itemType)}>Edit</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };
}

function mapStateToProps(state) {
    //testing importing elements
    //console.log('the state',state.dataElements);
    return {
        programs: state.programs.programs,
        indicators: state.indicators.indicators.indicators,
        dataSets: state.dataSets.dataSet.dataSets,
        dataElements: state.dataElements.dataElements.dataElements,
    }
}

export default connect(mapStateToProps)(LetterResults);