import React, {Component} from 'react';
import config from '../actions/config';
import {
    Alert,
    Button,
    ButtonGroup,
    ButtonToolbar, Col,
    ListGroup,
    Panel,
} from 'react-bootstrap';
import './Tabpane.css';
import Link from "react-router-dom/es/Link";
let output = "";
const headers ={
    headers:{
        'Authorization': `Basic ${btoa(config.username+":"+config.password)}`
    }
};
class LetterResultsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            filterText: ''
        }
    }
    componentDidMount() {
        this.setState({isLoading: true});
        let item = this.props.item;

        if (item === "programs") {
            fetch(config.url+`programs.json?fields=:all&paging=false`, headers
            ).then((Response) => Response.json())
                .then((findresponse) => {
                    this.setState({
                        data: findresponse.programs, isLoading: false
                    })
                })
        }
        else if (item === "dataSets") {
            fetch(config.url+'dataSets.json?fields=:all&paging=false', headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the input
                    this.setState({
                        data: findresponse.dataSets, isLoading: false
                    })
                })
        }
        else if (item === "indicators") {
            fetch(config.url+'indicators.json?fields=:all&paging=false', headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the input
                    this.setState({
                        data: findresponse.indicators, isLoading: false
                    });
                })
        }
        else if (item === "dataElements") {
            fetch(config.url+'dataElements.json?fields=:all&paging=false', headers
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
        if (this.props.letter === "char") {
            //select items that start with a non-letter character
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
                        <Panel>
                            <Panel.Body>
                                <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                    <ButtonGroup>
                                        <Link to={"/"+this.props.item+"/"+dynamicData.id}>
                                        <Button>View
                                        </Button>
                                        </Link>
                                    </ButtonGroup>&nbsp;
                                </ButtonToolbar>
                                <a href={"/"+this.props.item+"/"+dynamicData.id}>{dynamicData.name}</a>
                                <br/>
                                {dynamicData.description!==undefined?<div style={{color:"green"}}>Description: {dynamicData.description}</div>:<div style={{color:"red"}}>No description provided</div>}
                            </Panel.Body>
                        </Panel>
                    </div>
                ));
            //if no items are found return an alert
        }
        else {
            output = this.state.data
                .filter((dynamicData) => {
                    //console.log(dynamicData.name)
                    return dynamicData.name[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
                })
                .map((dynamicData) => (
                    <div key={dynamicData.id}>
                        <Panel>
                            <Panel.Body>
                                <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                    <ButtonGroup>
                                        <Link to={"/"+this.props.item+"/"+dynamicData.id}>
                                        <Button>View</Button>
                                    </Link>
                                    </ButtonGroup>&nbsp;
                                </ButtonToolbar>
                                <a href={"/"+this.props.item+"/"+dynamicData.id}>{dynamicData.name}</a>
                                <br/>
                                {dynamicData.description!==undefined?<div style={{color:"green"}}>Description: {dynamicData.description}</div>:<div style={{color:"red"}}>No description provided</div>}
                            </Panel.Body>
                        </Panel>
                    </div>
                ));
        }
        return (
            <div className="container letterResultsDetails">
                <Col xs={8} md={8}>
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

export default LetterResultsDetails;