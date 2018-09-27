import React, {Component} from 'react';
import './Tabpane.css';
import {
    Button,
    Col,
    Dropdown,
    DropdownButton,
    FormControl,
    Glyphicon,
    MenuItem,
    Nav,
    NavItem,
    Row,
    Tab
} from 'react-bootstrap';
import ButtonGroupNav from "./ButtonGroupNav";
import * as ReactDOM from "react-dom";
import config from "../actions/config";
import ShowAll from "./ShowAll";
import {Offline, Online} from "react-detect-offline";

const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username + ":" + config.password)}`
    }
};

class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }

    render() {
        return (
            <div ref={node => this.node = node}>
                <Button onClick={this.handleClick}>
                    {this.props.children}
                </Button>
            </div>
        );
    }
}

class CustomMenu extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: ''
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    focusNext() {
        const input = ReactDOM.findDOMNode(this.input);

        if (input) {
            //input.focus();
        }
    }

    render() {
        const {children} = this.props;
        const {value} = this.state;

        return (
            <div className="dropdown-menu" style={{
                maxHeight: 500,
                overflowY: "auto"
            }}>
                <FormControl ref={c => {
                    this.input = c;
                }}
                             type="text"
                             placeholder="Type to filter..."
                             onChange={this.handleChange}
                             value={value.toLowerCase()}
                             style={{margin: 10, width: "90%"}}
                />
                <div style={{color: "#FEC519", margin: 10}}>Click the top button to dismiss. <Glyphicon
                    glyph={"warning-sign"} className={"pull-right"}/></div>
                {React.Children.toArray(children).filter(
                    child => !value.trim() || child.props.children[1].toLowerCase().indexOf(value) !== -1
                ).length !== 0 ? React.Children.toArray(children).filter(
                    child => !value.trim() || child.props.children[1].toLowerCase().indexOf(value) !== -1
                ) : <div><Online>
                    <div style={{color: "red", margin: 10}}>No groups found</div>
                </Online><Offline>
                    <div className="spinner">
                        <div className="double-bounce1"/>
                        <div className="double-bounce2"/>
                    </div>
                </Offline></div>
                }
            </div>
        );
    }
}

class Tabpane extends Component {
    constructor() {
        super();
        this.state = {
            viewTabs: true,
            selectedGroup: "Filter",
            data: [],
            selectedItem: "datasets",
            selectedId: "",
            selectedItemdd: {
                "item": 1,
                "name": "All"
            }
        };
        this.showAllButton = this.showAllButton.bind(this);
        this.removeAllButton = this.removeAllButton.bind(this);
    }

    handleClick(id) {
        switch (id) {
            case 1:
                this.setState({selectedItem: "Filter", selectedItemdd: {"item": 1, "name": "All"}});
                break;
            case 2:
                this.setState({
                    selectedItem: "datasets",
                    selectedItemdd: {"item": 2, "name": "Datasets"}
                }, this.callGroups.bind(this, "datasets"));
                break;
            case 3:
                this.setState({
                    selectedItem: "indicators",
                    selectedItemdd: {"item": 3, "name": "Indicators"}
                }, this.callGroups.bind(this, "indicators"));
                break;
            case 4:
                this.setState({
                    selectedItem: "programs",
                    selectedItemdd: {"item": 4, "name": "Programs"}
                }, this.callGroups.bind(this, "programs"));
                break;
            case 5:
                this.setState({
                    selectedItem: "dataelements",
                    selectedItemdd: {"item": 5, "name": "Data Elements"}
                }, this.callGroups.bind(this, "dataelements"));
                break;
            default:
                this.setState({
                    selectedItem: "dataelements",
                    selectedItemdd: {"item": 0, "name": "None"}
                }, this.callGroups.bind(this, "dataelements"))
        }
    }

    handleGroup(name, id) {
        //console.log(name);
        this.setState({selectedGroup: name, selectedId: id});
    }

    showAllButton() {
        this.setState({viewTabs: false});
        ReactDOM.render(<ShowAll groups={this.state.selectedItem}
                                 id={this.state.selectedId}/>, document.querySelector("#displayHereAfter"))
    }

    removeAllButton() {
        this.setState({
            viewTabs: true,
            selectedGroup: "Filter",
            selectedItem: "Filter",
            selectedItemdd: {"item": 1, "name": "All"}
        });
        ReactDOM.render("", document.querySelector("#displayHereAfter"))
    }

    callGroups(itemCalled) {
        if (itemCalled === "dataelements") {
            fetch(`http://197.136.81.99:8082/test/api/dataElementGroups.json?fields=:all?&paging=false`, headers)
                .then(response => {
                    return response.json();
                }).then(findresponse => {
                /* console.log(findresponse.dataElementGroups);*/
                this.setState({
                    data: findresponse.dataElementGroups, selectedGroup: "Filter"
                })
            }).catch(error => {
                console.log(error);
            });
        }
        else if (itemCalled === "indicators") {
            fetch(`http://197.136.81.99:8082/test/api/indicatorGroups.json?fields=:all?&paging=false`, headers)
                .then(response => {
                    return response.json();
                }).then(findresponse => {
                /* console.log(findresponse.dataElementGroups);*/
                this.setState({
                    data: findresponse.indicatorGroups, selectedGroup: "Filter"
                })
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            this.setState({
                data: [], selectedGroup: "Filter"
            })
        }

    }

    render() {
        return (
            <div className="tabpanebody">
                <div className="container">
                    <hr/>
                    <Row>
                        <label style={{marginLeft: 10}}>Filter by Groups</label>&nbsp;
                        <DropdownButton id="input-dropdown-addon"
                                        title={this.state.selectedItemdd.name}>
                            <MenuItem key="nav2" onClick={this.handleClick.bind(this, 2)}>Data
                                Sets{this.state.selectedItemdd.item === 2 ? <Glyphicon glyph="ok" bsStyle={"primary"}
                                                                                       className={"pull-right"}/> : null}</MenuItem>
                            <MenuItem key="nav3"
                                      onClick={this.handleClick.bind(this, 3)}>Indicators{this.state.selectedItemdd.item === 3 ?
                                <Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/> : null}</MenuItem>
                            <MenuItem key="nav4"
                                      onClick={this.handleClick.bind(this, 4)}>Programs{this.state.selectedItemdd.item === 4 ?
                                <Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/> : null}</MenuItem>
                            <MenuItem key="nav5" onClick={this.handleClick.bind(this, 5)}>Data
                                Elements{this.state.selectedItemdd.item === 5 ?
                                    <Glyphicon glyph="ok" bsStyle={"primary"}
                                               className={"pull-right"}/> : null}</MenuItem>
                        </DropdownButton>&nbsp;
                        <Dropdown id="dropdown-custom-menu">
                            <CustomToggle bsRole="toggle">{this.state.selectedGroup} <span
                                className={"caret"}/></CustomToggle>
                            <CustomMenu bsRole="menu">
                                {this.state.data.map((dynamicData, key) =>
                                    <MenuItem onClick={this.handleGroup.bind(this, dynamicData.name, dynamicData.id)}
                                              key={key}> {dynamicData.name}</MenuItem>
                                )}
                            </CustomMenu>
                        </Dropdown>&nbsp;
                        {this.state.viewTabs && this.state.selectedGroup !== "Filter" ?
                            <Button onClick={this.showAllButton}>View All</Button> : null}&nbsp;
                        {!this.state.viewTabs ? <Button bsStyle="danger" onClick={this.removeAllButton}><Glyphicon
                            glyph={"repeat"}/></Button> : null}
                    </Row>
                    <hr/>
                    {this.state.viewTabs ? <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
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
                                        <Tab.Pane eventKey="first"><ButtonGroupNav item={"datasets"}/></Tab.Pane>
                                        <Tab.Pane eventKey="second"><ButtonGroupNav item={"indicators"}/></Tab.Pane>
                                        <Tab.Pane eventKey="third"><ButtonGroupNav item={"programs"}/></Tab.Pane>
                                        <Tab.Pane eventKey="fourth"><ButtonGroupNav item={"dataelements"}/></Tab.Pane>
                                    </Tab.Content>
                                </div>
                            </Col>
                        </Row>
                    </Tab.Container> : null}
                    <div id={"displayHereAfter"}/>
                </div>
            </div>

        );
    }
}

export default Tabpane;