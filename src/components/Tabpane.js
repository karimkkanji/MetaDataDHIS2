import React, {Component} from 'react';
import './Tabpane.css';
import {Nav, NavItem, Col, Row, Tab, Button, FormControl, MenuItem} from 'react-bootstrap';
import ButtonGroupNav from "./ButtonGroupNav";
import './Tabpane.css';
import * as ReactDOM from "react-dom";
import Dropdown from "react-bootstrap/es/Dropdown";
import config from "../actions/config";
const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username+":"+config.password)}`
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
            <Button onClick={this.handleClick}>
                {this.props.children}
            </Button>
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
        this.setState({ value: e.target.value });
    }

    focusNext() {
        const input = ReactDOM.findDOMNode(this.input);

        if (input) {
            input.focus();
        }
    }

    render() {
        const { children } = this.props;
        const { value } = this.state;

        return (
            <div className="dropdown-menu" style={{ padding: '' }}>
                <FormControl ref={c => {this.input = c;}}
                             type="text"
                             placeholder="Type to filter..."
                             onChange={this.handleChange}
                             value={value.toLowerCase()}
                             style={{margin:10,width:"90%"}}
                />
                {React.Children.toArray(children).filter(
                    child => !value.trim() || child.props.children[1].toLowerCase().indexOf(value) !== -1
                ).length!==0?React.Children.toArray(children).filter(
                    child => !value.trim() || child.props.children[1].toLowerCase().indexOf(value) !== -1
                ):<div style={{color:"red",margin:5}}>No record found</div>
                }
            </div>
        );
    }
}
class Tabpane extends Component {
    constructor(){
        super();
        this.state = {
            selectedGroup: "Filter",
            data:[],
            selectedItem:"datasets"
        }
    }
    changeItemSelected(itemSel){
        switch (itemSel) {
            case "de":this.setState({selectedItem:"dataelements"},this.callGroups.bind(this,"dataelements"));break;
            case "prog":this.setState({selectedItem:"programs"},this.callGroups.bind(this,"programs"));break;
            case "ind":this.setState({selectedItem:"indicators"},this.callGroups.bind(this,"indicators"));break;
            case "ds":this.setState({selectedItem:"datasets"},this.callGroups.bind(this,"datasets"));break;
            default:this.setState({selectedItem:"dataelements"},this.callGroups.bind(this,"dataelements"));break;
        }
    }
    handleGroup(name){
        console.log(name);
        this.setState({selectedGroup:name});
    }
    callGroups(itemCalled) {
        if(itemCalled==="dataelements") {
            fetch(`http://197.136.81.99:8082/test/api/dataElementGroups.json?fields=:all?&paging=false`, headers)
                .then(response => {
                    return response.json();
                }).then(findresponse => {
                /* console.log(findresponse.dataElementGroups);*/
                this.setState({
                    data: findresponse.dataElementGroups,
                })
            }).catch(error => {
                console.log(error);
            });
        }
        else if(itemCalled==="indicators"){
            fetch(`http://197.136.81.99:8082/test/api/indicatorGroups.json?fields=:all?&paging=false`, headers)
                .then(response => {
                    return response.json();
                }).then(findresponse => {
                /* console.log(findresponse.dataElementGroups);*/
                this.setState({
                    data: findresponse.indicatorGroups,
                })
            }).catch(error => {
                console.log(error);
            });
        }
        else{
            this.setState({
                data:[]
            })
        }

    }
    render() {
        return (
            <div className="tabpanebody">
                <div className="container">
                    <label>Choose a filter:</label>&nbsp;
                    <Dropdown id="dropdown-custom-menu" style={{marginBottom:8}}>
                        <CustomToggle bsRole="toggle">{this.state.selectedGroup} <span className={"caret"}/></CustomToggle>
                        <CustomMenu bsRole="menu">
                            {this.state.data.map( (dynamicData,key) =>
                                <MenuItem onClick={this.handleGroup.bind(this,dynamicData.name)} key={key}> {dynamicData.name}</MenuItem>
                            )}
                        </CustomMenu>
                    </Dropdown>
                    <hr/>
                    <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
                        <Row className="clearfix">
                            <Col sm={12}>
                                <Nav bsStyle="tabs">
                                    <NavItem eventKey="first" onClick={this.changeItemSelected.bind(this,"ds")}>Datasets</NavItem>
                                    <NavItem eventKey="second" onClick={this.changeItemSelected.bind(this,"ind")}>Indicators</NavItem>
                                    <NavItem eventKey="third" onClick={this.changeItemSelected.bind(this,"prog")}>Programs</NavItem>
                                    <NavItem eventKey="fourth" onClick={this.changeItemSelected.bind(this,"de")}>Data Elements</NavItem>
                                    </Nav>
                            </Col>
                            <Col sm={12}>
                                <div className={"container content"}>
                                    <Tab.Content animation>
                                        <Tab.Pane eventKey="first"><ButtonGroupNav item={"datasets"}/></Tab.Pane>
                                        <Tab.Pane eventKey="second"><ButtonGroupNav item={"indicators"}/></Tab.Pane>
                                        <Tab.Pane eventKey="third" ><ButtonGroupNav item={"programs"}/></Tab.Pane>
                                        <Tab.Pane eventKey="fourth" ><ButtonGroupNav item={"dataelements"}/></Tab.Pane>
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