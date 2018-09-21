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
    Modal,
    Glyphicon,
    Row, MenuItem, Dropdown
} from 'react-bootstrap';
import './Tabpane.css';
import connect from "react-redux/es/connect/connect";
import {fetchPrograms} from "../actions/programActions";
import {fetchDataSets} from "../actions/datasetActions";
import {fetchDataElements} from "../actions/dataelementsActions";
import {fetchIndicators} from "../actions/indicatorActions";
import config from '../actions/config';
class LetterResults extends Component {
    componentWillMount(){
        this.props.dispatch(fetchPrograms());
        this.props.dispatch(fetchIndicators());
        this.props.dispatch(fetchDataSets());
        this.props.dispatch(fetchDataElements());
    }
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
        this.state = {
            isloading:false,
            show: false,
            description:"",
            name:"",
            id:"",
            aggregationType: "",
            domainType: "",
            valueType:"",
            shortName: ""
        };
    }
    updateRecord(){
    }
    handleClose() {
        this.setState({ show: false,isLoading: false });
    }

    handleShow(id,description,name,aggregationType,domainType,valueType,shortName) {
        this.setState({isLoading: true, show: true,description:description,id:id,name:name,aggregationType:aggregationType,domainType:domainType,valueType:valueType,shortName:shortName});
    }
    /*create(nameass,idass,descrass,aggreg,domain,value,short){
        name= nameass;
        id =idass;
        description=descrass;
        aggType = aggreg;
        domType = domain;
        valType = value;
        shortname = short;
    }
    */
    getPrograms(){
        //console.log('received programs',this.props.programs)
        if(this.props.programs) {
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
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{program.displayName}</p>

                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button
                                                        href={"/" + this.props.item + "/" + program.id}>More</Button>
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
                                                    <Button onClick={() => {this.handleShow.bind(this,program.name,program.id,program.description,program.aggregationType,program.domainType,program.valueType,program.shortName);}}> <Glyphicon glyph="pencil"/> Edit</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <Label bsStyle="default"
                                                   style={{marginLeft: 10}}>{program.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{program.formType}</Label>&nbsp;
                                            <Label bsStyle={"primary"}>{program.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{program.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{program.aggregationType}</Label><br/>
                                        </Row>
                                        {(program.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : program.description}
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            )
        }
    }
    /*
    handledescriptionChange=(e)=> {
        this.setState({description: e.target.value});
        console.log(e.target.value);
    };
    */
    getIndicators(){
        if(this.props.indicators) {
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
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{indicator.displayName}</p>

                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button
                                                        href={"/" + this.props.item + "/" + indicator.id}>More</Button>
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
                                                    <Button onClick={this.handleShow}> <Glyphicon glyph="pencil"/> Edit</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        {(indicator.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : indicator.description}
                                        <row>
                                            <Label bsStyle="default"
                                                   style={{marginLeft: 10}}>{indicator.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{indicator.formType}</Label>&nbsp;
                                            <Label
                                                bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{indicator.numeratorDescription}
                                            </Label><br/>&nbsp;
                                            <Label
                                                bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{indicator.denominatorDescription}
                                            </Label>&nbsp;
                                            <Label bsStyle={"primary"}>{indicator.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{indicator.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{indicator.aggregationType}</Label><br/>
                                        </row>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }

    }
    getDataSets(){
        //console.log('received DataSets',this.props.dataSets)

        //add returning functions here
        if(this.props.dataSets) {
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
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{dataset.displayName}</p>

                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button
                                                        href={"/" + this.props.item + "/" + dataset.id}>More</Button>
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
                                                    <Button onClick={this.handleShow.bind(this,dataset.id,dataset.description,dataset.name,dataset.aggregationType,dataset.domainType,dataset.valueType,dataset.shortName)}> <Glyphicon glyph="pencil"/> Edit</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <Label bsStyle="default"
                                                   style={{marginLeft: 10}}>{dataset.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{dataset.formType}</Label>&nbsp;
                                            <Label
                                                bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{dataset.numeratorDescription}
                                            </Label>&nbsp;
                                            <Label
                                                bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{dataset.denominatorDescription}
                                            </Label>&nbsp;
                                            <Label bsStyle={"primary"}>{dataset.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{dataset.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{dataset.aggregationType}</Label><br/>
                                        </Row>
                                        {(dataset.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataset.description}
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }
    }
    getDataElements(){
        //console.log('received DataElements',this.props.dataElements)
        //console.log('received DataSets',this.props.dataSets)
        if(this.props.dataElements) {
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
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{dataElements.displayName}</p>

                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button
                                                        href={"/" + this.props.item + "/" + dataElements.id}>More</Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShow.bind(this,dataElements.id,dataElements.description,dataElements.name,dataElements.aggregationType,dataElements.domainType,dataElements.valueType,dataElements.shortName)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <Label bsStyle="default"
                                                   style={{marginLeft: 10}}>{dataElements.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{dataElements.formType}</Label>&nbsp;
                                            <Label
                                                bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{dataElements.numeratorDescription}
                                            </Label>&nbsp;
                                            <Label
                                                bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{dataElements.denominatorDescription}
                                            </Label>&nbsp;
                                            <Label bsStyle={"primary"}>{dataElements.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{dataElements.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{dataElements.aggregationType}</Label><br/>
                                        </Row>
                                        {(dataElements.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataElements.description}
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }
        //add returning functions here
    }
    getProgramsMixed(){
        //console.log('received programs',this.props.programs)
        if(this.props.programs) {
            return this.props.programs
                .filter((program) => {
                    if (program.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return program.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else{
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
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{program.displayName}</p>

                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button
                                                        href={"/" + this.props.item + "/" + program.id}>More</Button>
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
                                                    <Button> <Glyphicon glyph="pencil"/> Edit</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <Label bsStyle="default"
                                                   style={{marginLeft: 10}}>{program.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{program.formType}</Label>&nbsp;
                                            <Label
                                                bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{program.numeratorDescription}
                                            </Label>&nbsp;
                                            <Label
                                                bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{program.denominatorDescription}
                                            </Label>&nbsp;
                                            <Label bsStyle={"primary"}>{program.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{program.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{program.aggregationType}</Label><br/>
                                        </Row>
                                        {(program.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : program.description}
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            )
        }
    }
    getIndicatorsMixed(){
        //console.log('received indicators',this.props.indicators)

        //add returning functions here

        if(this.props.indicators) {
            return this.props.indicators
                .filter((indicator) => {
                    //console.log(dynamicData.name)
                    if (indicator.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return indicator.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else{
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
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{indicator.displayName}</p>

                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button
                                                        href={"/" + this.props.item + "/" + indicator.id}>More</Button>
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
                                                    <Button> <Glyphicon glyph="pencil"/> Edit</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        {(indicator.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : indicator.description}
                                        <row>
                                            <Label bsStyle="default"
                                                   style={{marginLeft: 10}}>{indicator.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{indicator.formType}</Label>&nbsp;
                                            <Label
                                                bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{indicator.numeratorDescription}
                                            </Label><br/>&nbsp;
                                            <Label
                                                bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{indicator.denominatorDescription}
                                            </Label>&nbsp;
                                            <Label bsStyle={"primary"}>{indicator.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{indicator.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{indicator.aggregationType}</Label><br/>
                                        </row>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }

    }
    getDataSetsMixed(){
        //console.log('received DataSets',this.props.dataSets)

        //add returning functions here
        if(this.props.dataSets) {
            return this.props.dataSets
                .filter((dataset) => {
                    //console.log(dynamicData.name)
                    if (dataset.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return dataset.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else{
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
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{dataset.displayName}</p>

                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button
                                                        href={"/" + this.props.item + "/" + dataset.id}>More</Button>
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
                                                    <Button> <Glyphicon glyph="pencil"/> Edit</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <Label bsStyle="default"
                                                   style={{marginLeft: 10}}>{dataset.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{dataset.formType}</Label>&nbsp;
                                            <Label
                                                bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{dataset.numeratorDescription}
                                            </Label>&nbsp;
                                            <Label
                                                bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{dataset.denominatorDescription}
                                            </Label>&nbsp;
                                            <Label bsStyle={"primary"}>{dataset.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{dataset.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{dataset.aggregationType}</Label><br/>
                                        </Row>
                                        {(dataset.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataset.description}
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }
    }
    getDataElementsMixed(){
        //console.log('received DataElements',this.props.dataElements)
        //console.log('received DataSets',this.props.dataSets)
        if(this.props.dataElements) {
            //add returning functions here
            return this.props.dataElements
                .filter((dataElements) => {
                    //console.log(dynamicData.name)
                    if (dataElements.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return dataElements.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else{
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
                                                </ButtonGroup>&nbsp;
                                            </ButtonToolbar>
                                            <p>{dataElements.displayName}</p>

                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Button
                                                        href={"/" + this.props.item + "/" + dataElements.id}>More</Button>
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
                                                    <Button> <Glyphicon glyph="pencil"/> Edit</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <Label bsStyle="default"
                                                   style={{marginLeft: 10}}>{dataElements.periodType}</Label>&nbsp;
                                            <Label bsStyle="info">{dataElements.formType}</Label>&nbsp;
                                            <Label
                                                bsStyle={"primary"}>{this.props.item === "indicators" ? "Numerator: " : null}{dataElements.numeratorDescription}
                                            </Label>&nbsp;
                                            <Label
                                                bsStyle={"danger"}>{this.props.item === "indicators" ? "Denominator: " : null}{dataElements.denominatorDescription}
                                            </Label>&nbsp;
                                            <Label bsStyle={"primary"}>{dataElements.domainType}</Label>&nbsp;
                                            <Label bsStyle={"success"}>{dataElements.valueType}</Label>&nbsp;
                                            <Label bsStyle={"info"}>{dataElements.aggregationType}</Label><br/>
                                        </Row>
                                        {(dataElements.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataElements.description}
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Col>
                        </div>
                    )
                })
        }
        else{
            return(
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
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
        else{
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
                        {output.length !== 0? output :
                            <div><Col xs={6} md={6}><Alert bsStyle={"warning"}><strong>No records found!</strong> There is no
                                metadata that starts <strong>{this.props.letter}</strong></Alert></Col></div>}
                    </ListGroup>
                </Col>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Current Description:</h4>
                        {(this.state.description === undefined) ?
                            <div style={{color: "#ff0000"}}>No description
                                provided.</div> : this.state.description}<br/>
                        <h4>New Description</h4>
                        <textarea placeholder={"Type new description here..."} className="form-control" onBlur={this.handledescriptionChange}></textarea>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle={"warning"}>Edit</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };
//()=>{this.update();this.handleClose();}
}
function mapStateToProps(state) {
    //testing importing elements
    //console.log('the state',state.dataElements);
    return{
        programs: state.programs.programs,
        indicators: state.indicators.indicators.indicators,
        dataSets: state.dataSets.dataSet.dataSets,
        dataElements: state.dataElements.dataElements.dataElements,
    }
}
export default connect(mapStateToProps)(LetterResults);