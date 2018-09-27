import React, {Component} from 'react';
import './Tabpane.css';
import config from '../actions/config';
import {
    Alert,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Dropdown,
    Glyphicon,
    Label,
    MenuItem,
    Modal,
    Panel,
    PanelGroup,
    Row
} from "react-bootstrap";
import ReactDOM from "react-dom";
import Col from "react-bootstrap/es/Col";

const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username + ":" + config.password)}`
    }
};

function IndicatorGroup({groupsGotten}) {
    return (<Col xs={6}><PanelGroup accordion id={groupsGotten.displayName}>
        <Panel eventKey={groupsGotten.id} bsStyle="info">
            <Panel.Heading>
                <Panel.Title toggle>
                    <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                        <ButtonGroup>
                            <Glyphicon glyph="chevron-down"/>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <p>{groupsGotten.displayName}</p>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
                <h6>Actions:</h6><Row style={{marginLeft: 10}}>
                <ButtonToolbar>
                    <ButtonGroup>
                    </ButtonGroup>&nbsp;
                    <Dropdown id="dropdown-custom-1">
                        <Dropdown.Toggle>
                            <Glyphicon glyph="print"/>&nbsp;Export / Print
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <MenuItem eventKey="1"
                                      href={groupsGotten.href + ".csv"}>CSV</MenuItem>
                            <MenuItem eventKey="2"
                                      href={groupsGotten.href + ".xlsx"}>Excel</MenuItem>
                            <MenuItem eventKey="3"
                                      href={groupsGotten.href + ".pdf"}>PDF</MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>&nbsp;
                </ButtonToolbar>
            </Row>
                <hr/>
                <h6>Description:</h6><h3>{(groupsGotten.description === undefined) ?
                <div style={{color: "#ff0000"}}>No description
                    provided.</div> : groupsGotten.description}</h3>
                <hr/>
                <h6>Quick info:</h6>
                <Label bsStyle="default" style={{marginLeft: 10}}>{groupsGotten.periodType}</Label>&nbsp;
                <Label
                    bsStyle={"primary"}>{groupsGotten.numeratorDescription !== null ? "Numerator: " + groupsGotten.numeratorDescription : null}
                </Label>&nbsp;
                <Label
                    bsStyle={"danger"}>{groupsGotten.denominatorDescription !== null ? "Denominator: " + groupsGotten.denominatorDescription : null}
                </Label>&nbsp;
                <Label bsStyle="info">{groupsGotten.formType}</Label>&nbsp;
                <Label bsStyle={"primary"}>{groupsGotten.domainType}</Label>&nbsp;
                <Label bsStyle={"success"}>{groupsGotten.valueType}</Label>&nbsp;
                <Label bsStyle={"info"}>{groupsGotten.aggregationType}</Label><br/>
            </Panel.Body>
        </Panel>
    </PanelGroup>
    </Col>);
}

function DisplayElements({elem}) {
    //console.log(elem);
    return (
        <div>{elem.map((groups) => <IndicatorGroup groupsGotten={groups} key={groups.name}/>)}</div>
    );
}

class ShowAll extends Component {
    handledescriptionChange = (e) => {
        this.setState({description: e.target.value});
        //console.log(e.target.value);
    };

    constructor(props) {
        super(props);
        this.state = {
            activeDetails: [],
            isLoading: false

        }
    }

    componentDidMount() {
        let whatGroup = "", toHighlight = "", groups = this.props.groups;
        switch (this.props.groups) {
            case "programs":
                whatGroup = "programGroups";
                toHighlight = "programs";
                break;
            case "dataelements":
                whatGroup = "dataElementGroups";
                toHighlight = "dataElements";
                break;
            case "indicators":
                whatGroup = "indicatorGroups";
                toHighlight = "indicators";
                break;
            default:
                whatGroup = "null";
                break;
        }
        fetch(
            `http://197.136.81.99:8082/test/api/${whatGroup}/${this.props.id}.json?fields=${toHighlight}[*]`, headers
        ).then(function (response) {
                return response.json();
            }
        ).then(function (jsonData) {
            //handle json data processing here
            ReactDOM.render(<DisplayElements
                elem={groups === "indicators" ? jsonData.indicators : jsonData.dataElements}/>, document.querySelector("#display"));
        })
    };

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

    handleShowprograms(id, description, name, shortname, programType) {
        this.setState({
            isLoading: true,
            show: true,
            itemType: "prog",
            descriptionView: description,
            description: description,
            id: id,
            name: name,
            programType: programType,
            shortname: shortname
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

    render() {
        return (
            <div>
                <div id={"display"}>
                    <div className="spinner">
                        <div className="double-bounce1"/>
                        <div className="double-bounce2"/>
                    </div>
                </div>
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
        );
    }

}

export default ShowAll