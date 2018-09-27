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
import {Link} from "react-router-dom"
import './Tabpane.css';
import connect from "react-redux/es/connect/connect";
import {fetchPrograms} from "../actions/programActions";
import {fetchDataSets} from "../actions/datasetActions";
import {fetchDataElements} from "../actions/dataelementsActions";
import {fetchIndicators} from "../actions/indicatorActions";
import {fetchProgramDataElements} from "../actions/programdataelementsActions"
import config from '../actions/config';
import {Online,Offline} from "react-detect-offline";
class LetterResults extends Component {
    componentWillMount(){
        this.props.dispatch(fetchPrograms());
        this.props.dispatch(fetchIndicators());
        this.props.dispatch(fetchDataSets());
        this.props.dispatch(fetchDataElements());
        this.props.dispatch(fetchProgramDataElements());
    }
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        /*this.updateRecord = this.updateRecord.bind(this);*/
        this.state = {
            isloading:false,
            show: false,
            itemType:"",
            description:"",
            name:"",
            id:"",
            aggregationType: "",
            domainType: "",
            valueType:"",
            shortName: "",
            periodType:"",
            indicatorType:"",
            numerator:"",
            denominator:"",
            shortname:"",
            programType: ""
        };
    }
    handleClose() {
        this.setState({ show: false,isLoading: false });
    }
    handleShow(id,description,name,aggregationType,domainType,valueType,shortName) {
        this.setState({isLoading: true, show: true, itemType:"de", description:description,id:id,name:name,aggregationType:aggregationType,domainType:domainType,valueType:valueType,shortName:shortName});
    }
    handleShowdatasets(id,description,name,periodType) {
        this.setState({isLoading: true, show: true,itemType:"ds",description:description,id:id,name:name,periodType:periodType});
    }
    handleShowindicators(id,description,name,indicatorType,numerator,denominator,shortname) {
        this.setState({isLoading: true, show: true,itemType:"indi",description:description,id:id,name:name,indicatorType:indicatorType, numerator:numerator, denominator:denominator, shortname:shortname});
    }
    handleShowprograms(id,description,name,shortname,programType) {
        this.setState({isLoading: true, show:true,itemType:"prog",description:description,id:id,name:name, programType:programType,
            shortname:shortname});
    }
    handleShowProgramde(id,description,name,aggregationType,shortName) {
        this.setState({isLoading: true, show: true, itemType:"pde", description:description,id:id,name:name,aggregationType:aggregationType,shortName:shortName});
    }
    update(itemType) {
        let placeholder="", headerPlace ="";
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
                headerPlace ="dataElements/";
            break;
            case "prog":
                placeholder = JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    shortName: this.state.shortName,
                    programType:this.state.programType
                });
                headerPlace ="programs/";
            break;
            case "ds":
                placeholder = JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    periodType:this.state.periodType
                });
                headerPlace ="dataSets/";
            break;
            case "indi":
                placeholder = JSON.stringify({
                    name: this.state.name,
                    description: this.state.description,
                    indicatorType:this.state.indicatorType,
                    numerator:this.state.numerator,
                    denominator:this.state.denominator,
                    shortName:this.state.shortName
                });
                headerPlace ="indicators/";
            break;
            case "pde" :
            placeholder = JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                aggregationType: this.state.aggregationType,
                valueType: this.state.valueType,
                shortName: this.state.shortName
            });
            headerPlace ="programDataElements/";
        break;  
            default: placeholder=undefined; headerPlace=undefined;
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
            .then(json => console.log(json))
        window.alert("Updated");
        this.handleClose();
    }
    handledescriptionChange=(e)=> {
        this.setState({description: e.target.value});
        console.log(e.target.value);
    };
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
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{dataset.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + dataset.id}><Button>More </Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShowdatasets.bind(this,dataset.id,dataset.description,dataset.name,dataset.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(dataset.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataset.description}</h3>
                                        <hr/>
                                        <Label bsStyle="default"
                                               style={{marginLeft: 10}}>Period Type: {dataset.periodType}</Label>&nbsp;
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
        else{
            return(
                <div>
            <Online>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </Online>
            <Offline>
                <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
            </Offline>
        </div>
            );
        }
    }
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
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{program.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + program.id}><Button>More </Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShowprograms.bind(this,program.id,program.description,program.name,program.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(program.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : program.description}</h3>
                                        <hr/>
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
                <div>
            <Online>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </Online>
            <Offline>
                <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
            </Offline>
        </div>
            );
        }
    }
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
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{indicator.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + indicator.id}><Button>More </Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShowindicators.bind(this,indicator.id,indicator.description,indicator.name,indicator.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(indicator.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : indicator.description}</h3>
                                        <hr/>
                                        <Label bsStyle="default"
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
        else{
            return(
                <div>
            <Online>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </Online>
            <Offline>
                <Alert bsStyle={"danger"}>You are offline. Check your Internet connection and try again!</Alert>
            </Offline>
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
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{dataElements.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + dataElements.id}><Button>More </Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShow.bind(this,dataElements.id,dataElements.description,dataElements.name,dataElements.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(dataElements.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataElements.description}</h3>
                                        <hr/>
                                        <Label bsStyle={"primary"}>Domain Type: {dataElements.domainType}</Label>&nbsp;
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
        else{
            return(
                <div>
            <Online>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
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
    getProgramDataElements(){
        //console.log('received DataElements',this.props.dataElements)
        //console.log('received DataSets',this.props.dataSets)
        if(this.props.programDataElements) {
            //add returning functions here
            return this.props.ProgramDataElements
                .filter((programDataElements) => {
                    //console.log(dynamicData.name)
                    return programDataElements.displayName[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
                })
                .map((programDataElements) => {
                    return (
                        <div key={programDataElements.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={programDataElements.displayName}>
                                <Panel eventKey={programDataElements.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{programDataElements.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + programDataElements.id}><Button>More </Button>
                                                    </Link>
                                                </ButtonGroup>&nbsp;
                                                <Dropdown id="dropdown-custom-1">
                                                    <Dropdown.Toggle>
                                                        <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="super-colors">
                                                        <MenuItem eventKey="1"
                                                                  href={programDataElements.href + ".csv"}>CSV</MenuItem>
                                                        <MenuItem eventKey="2"
                                                                  href={programDataElements.href + ".xlsx"}>Excel</MenuItem>
                                                        <MenuItem eventKey="3"
                                                                  href={programDataElements.href + ".pdf"}>PDF</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>&nbsp;
                                                <ButtonGroup>
                                                    <Button> <Glyphicon glyph="share"/> Share</Button>
                                                </ButtonGroup>&nbsp;
                                                <ButtonGroup>
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShowProgramde.bind(this,programDataElements.id,programDataElements.description,programDataElements.name,programDataElements.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(programDataElements.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : programDataElements.description}</h3>
                                        <hr/>
                                       
                                        <Label bsStyle={"success"}>Value Type: {programDataElements.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>Aggregation Type: {programDataElements.aggregationType}</Label><br/>
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
                <div>
            <Online>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </Online>
            <Offline>
                <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
            </Offline>
        </div>
            );
        }}
    getProgramsMixed(){
        //console.log('received programs',this.props.programs)
        if(this.props.programs) {
            return this.props.programs
                .filter((program) => {
                    if (program.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return program.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
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
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{program.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + program.id}><Button>More </Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShowprograms.bind(this,program.id,program.description,program.name,program.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(program.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : program.description}</h3>
                                        <hr/>
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
                <div>
            <Online>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </Online>
            <Offline>
                <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
            </Offline>
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
                    if (indicator.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return indicator.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
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
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{indicator.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + indicator.id}><Button>More </Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShowindicators.bind(this,indicator.id,indicator.description,indicator.name,indicator.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(indicator.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : indicator.description}</h3>
                                        <hr/>
                                        <Label bsStyle="default"
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
        else{
            return(
                <div>
            <Online>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </Online>
            <Offline>
                <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
            </Offline>
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
                    if (dataset.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return dataset.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
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
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{dataset.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + dataset.id}><Button>More </Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShowdatasets.bind(this,dataset.id,dataset.description,dataset.name,dataset.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(dataset.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataset.description}</h3>
                                        <hr/>
                                        <Label bsStyle="default"
                                               style={{marginLeft: 10}}>Period Type: {dataset.periodType}</Label>&nbsp;
                                        <Label bsStyle="info">Form Type: {dataset.formType}</Label>&nbsp;
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
                <div>
            <Online>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </Online>
            <Offline>
                <Alert bsStyle={"danger"}>You are offline. Check your interner connection and try again!</Alert>
            </Offline>
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
                    if (dataElements.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return dataElements.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
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
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{dataElements.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + dataElements.id}><Button>More </Button>
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
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShow.bind(this,dataElements.id,dataElements.description,dataElements.name,dataElements.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(dataElements.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : dataElements.description}</h3>
                                        <hr/>
                                        <Label bsStyle={"primary"}>Domain Type: {dataElements.domainType}</Label>&nbsp;
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
        else{
            return(
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
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
    
    getprogramDataElementsMixed(){
        //console.log('received DataElements',this.props.dataElements)
        //console.log('received DataSets',this.props.dataSets)
        if(this.props.programDataElements) {
            //add returning functions here
            return this.props.programDataElements
                .filter((programDataElements) => {
                    //console.log(dynamicData.name)
                    if (programDataElements.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return programDataElements.displayName[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else{
                        return undefined;
                    }
                })
                .map((programDataElements) => {
                    return (
                        <div key={programDataElements.id}><Col xs={11} md={11}>
                            <PanelGroup accordion id={programDataElements.displayName}>
                                <Panel eventKey={programDataElements.id} bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                                <ButtonGroup>
                                                    <Glyphicon glyph="chevron-down"/>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <p>{programDataElements.displayName}</p>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row style={{marginLeft: 10}}>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Link to={"/" + this.props.item + "/" + programDataElements.id}><Button>More </Button>
                                                    </Link>
                                                </ButtonGroup>&nbsp;
                                                <Dropdown id="dropdown-custom-1">
                                                    <Dropdown.Toggle>
                                                        <Glyphicon glyph="print"/>&nbsp;Export / Print
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="super-colors">
                                                        <MenuItem eventKey="1"
                                                                  href={programDataElements.href + ".csv"}>CSV</MenuItem>
                                                        <MenuItem eventKey="2"
                                                                  href={programDataElements.href + ".xlsx"}>Excel</MenuItem>
                                                        <MenuItem eventKey="3"
                                                                  href={programDataElements.href + ".pdf"}>PDF</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>&nbsp;
                                                <ButtonGroup>
                                                    <Button> <Glyphicon glyph="share"/> Share</Button>
                                                </ButtonGroup>&nbsp;
                                                <ButtonGroup>
                                                    <Button disabled={this.state.isLoading} onClick={this.handleShowProgramde.bind(this,programDataElements.id,programDataElements.description,programDataElements.name,programDataElements.periodType)}>{this.state.isLoading ?
                                                        <div className="lds-dual-ring"></div>: <div><Glyphicon glyph="pencil"/> Edit</div>}</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </Row>
                                        <hr/>
                                        <h3>{(programDataElements.description === undefined) ?
                                            <div style={{color: "#ff0000"}}>No description
                                                provided.</div> : programDataElements.description}</h3>
                                        <hr/>
                                        
                                        <Label bsStyle={"success"}>Value Type: {programDataElements.valueType}</Label>&nbsp;
                                        <Label bsStyle={"info"}>Aggregation Type: {programDataElements.aggregationType}</Label><br/>
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
                <div>
                    <Online>
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
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
            else if (this.props.item === "programdataelements") {
                output = this.getProgramDataElementsMixed();
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
            else if (this.props.item === "programdataelements") {
                output = this.getProgramDataElements();
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
                        <Button bsStyle={"warning"} onClick={this.update.bind(this,this.state.itemType)}>Edit</Button>
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
    return{
        programs: state.programs.programs,
        indicators: state.indicators.indicators.indicators,
        dataSets: state.dataSets.dataSet.dataSets,
        dataElements: state.dataElements.dataElements.dataElements,
        programDataElements: state.programDataElements.programDataElements.programDataElements,
    }
}
export default connect(mapStateToProps)(LetterResults);