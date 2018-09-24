import React, {Component} from 'react';
import config from '../actions/config'
import {
    Modal,
    Button,
    Nav,
    Navbar,
    MenuItem,
    NavDropdown,
    FormGroup,
    FormControl,
    InputGroup,
    DropdownButton,
    Glyphicon,
    Panel, ButtonToolbar, ButtonGroup
} from 'react-bootstrap';
import Link from "react-router-dom/es/Link";
import Label from "react-bootstrap/es/Label";
import {Offline, Online} from "react-detect-offline";
import Alert from "react-bootstrap/es/Alert";
const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username+":"+config.password)}`
    }
};
class NavbarCustom extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleInput = this.handleInput.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            value: '',
            ind_results:[],
            ds_results: [],
            dataElements_results:[],
            programs_results:[],
            filterText:'',
            selectedItem:{
                "item": 1,
                "name":"All"
            }
        };
    }
      handleClose() {
        document.getElementById("searchField").value="";
        this.setState({ show: false });
    }
    handleClick(id){
        switch (id) {
            case 1:this.setState({selectedItem:{"item":1,"name":"All"}});break;
            case 2:this.setState({selectedItem:{"item":2,"name":"Datasets"}});break;
            case 3:this.setState({selectedItem:{"item":3,"name":"Indicators"}});break;
            case 4:this.setState({selectedItem:{"item":4,"name":"Programs"}});break;
            case 5:this.setState({selectedItem:{"item":5,"name":"Data Elements"}});break;
            default:this.setState({selectedItem:{"item":0,"name":"None"}})
        }
    }
    handleInput() {
        let el=document.getElementById("searchField").value;
        this.setState({filterText: el, show: true});
    }

    handleSearch=(e)=> {
        this.setState({filterText: e.target.value});
        if(this.state.filterText!=="") {
            fetch(config.url + `indicators.json?filter=displayName:ilike:${this.state.filterText}`, headers)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        ind_results: data.indicators
                    });
                    /*console.log('filtertext() state inside componentwillmount', this.state.filterText)
                    console.log(this.state.ind_results)*/
                });
            fetch(config.url + `dataSets.json?filter=displayName:ilike:${this.state.filterText}`, headers)
                .then(response => response.json())
                .then(data => {

                    this.setState({
                        ds_results: data.dataSets
                    });
                   /* console.log(this.state.ds_results)*/
                });

            fetch(config.url + `dataElements.json?filter=displayName:ilike:${this.state.filterText}`, headers)
                .then(response => response.json())
                .then(data => {

                    this.setState({
                        dataElements_results: data.dataElements
                    });
                    /*console.log(this.state.dataElements_results)*/
                });

            fetch(config.url + `programs.json?filter=displayName:ilike:${this.state.filterText}`, headers)
                .then(response => response.json())
                .then(data => {

                    this.setState({
                        programs_results: data.programs
                    });
                   /* console.log(this.state.programs_results)*/
                });

           /* console.log(this.state.filterText);*/
        }
    };
    render() {
        const indicator_Items = this.state.ind_results.map( post => (
            <div key={post.id}>
                <Panel>
                    <Panel.Body>
                        <h4>{post.displayName}</h4>
                        <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                            <ButtonGroup>
                                <Link to={"/indicators/"+post.id}><Button >View</Button></Link>
                            </ButtonGroup>&nbsp;
                        </ButtonToolbar>
                        <a href={"/indicators/"+post.id}>{post.name}</a>
                        <br/>
                        {post.description!==undefined?<div style={{color:"green"}}>Description: {post.description}</div>:<div style={{color:"red"}}>No description provided</div>}
                        <br/><Label bsStyle={"warning"}>Indicator</Label>
                    </Panel.Body>
                </Panel>
            </div>
        ));

        const dataSets_Items = this.state.ds_results.map( post => (
            <div key={post.id}>
                <Panel>
                    <Panel.Body>
                        <h4>{post.displayName}</h4>
                        <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                            <ButtonGroup>
                                <Link to={"/indicators/"+post.id}><Button >View</Button></Link>
                            </ButtonGroup>&nbsp;
                        </ButtonToolbar>
                        <Link to={"/indicators/"+post.id}>{post.name}</Link>
                        <br/>
                        {post.description!==undefined?<div style={{color:"green"}}>Description: {post.description}</div>:<div style={{color:"red"}}>No description provided</div>}
                        <br/><Label bsStyle={"primary"}>Dataset</Label>
                    </Panel.Body>
                </Panel>
            </div>
        ));
        const dataElements_Items = this.state.dataElements_results.map( post => (
            <div key={post.id}>
                <Panel>
                    <Panel.Body>
                        <h4>{post.displayName}</h4>
                        <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                            <ButtonGroup>
                                <Link to={"/indicators/"+post.id}><Button >View</Button></Link>
                            </ButtonGroup>&nbsp;
                        </ButtonToolbar>
                        <Link to={"/indicators/"+post.id}>{post.name}</Link>
                        <br/>
                        {post.description!==undefined?<div style={{color:"green"}}>Description: {post.description}</div>:<div style={{color:"red"}}>No description provided</div>}
                        <br/><Label bsStyle={"success"}>Data Element</Label>
                        </Panel.Body>
                </Panel>
            </div>
        ));

        const programs_Items = this.state.programs_results.map( post => (
            <div key={post.id}>
                <Panel>
                    <Panel.Body>
                        <h4>{post.displayName}</h4>
                        <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                            <ButtonGroup>
                                <Link to={"/indicators/"+post.id}><Button >View</Button></Link>
                            </ButtonGroup>&nbsp;
                        </ButtonToolbar>
                        <Link to={"/indicators/"+post.id}>{post.name}</Link>
                        <br/>
                        {post.description!==undefined?<div style={{color:"green"}}>Description: {post.description}</div>:<div style={{color:"red"}}>No description provided</div>}
                        <br/><Label bsStyle={"danger"}>Program</Label>
                        </Panel.Body>
                </Panel>
            </div>
        ));

        return (
            <div>
                <Navbar fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Metadata Dictionary</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavDropdown  title="Filters" id="basic-nav-dropdown" >
                                <MenuItem>Action</MenuItem>
                                <MenuItem>Another action</MenuItem>
                                <MenuItem>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Form pullRight={true}>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Button>
                                            <DropdownButton componentClass={InputGroup.Button}
                                                            id="input-dropdown-addon"
                                                            title={this.state.selectedItem.name}>
                                                <MenuItem key="nav1" onClick={this.handleClick.bind(this,1)}>All {this.state.selectedItem.item===1?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                                <MenuItem key="nav2" onClick={this.handleClick.bind(this,2)}>Data Sets{this.state.selectedItem.item===2?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                                <MenuItem key="nav3" onClick={this.handleClick.bind(this,3)}>Indicators{this.state.selectedItem.item===3?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                                <MenuItem key="nav4" onClick={this.handleClick.bind(this,4)}>Programs{this.state.selectedItem.item===4?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                                <MenuItem key="nav5"onClick={this.handleClick.bind(this,5)}>Data Elements{this.state.selectedItem.item===5?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                            </DropdownButton>
                                        </InputGroup.Button>
                                        <FormControl type="text" placeholder={"Search metadata here..."} style={{width: 300}} id={"searchField"} onChange={()=>{this.handleInput()}}/>
                                        <FormControl.Feedback><Glyphicon glyph="search" /></FormControl.Feedback>
                                    </InputGroup>
                                </FormGroup>
                            </Navbar.Form>
                    </Navbar.Collapse>
                </Navbar>
                <Modal show={this.state.show} onHide={this.handleClose} bsSize={"large"}>
                    <Modal.Header closeButton>
                        <Modal.Title bsClass={"pull-center"}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Button>
                                        <DropdownButton componentClass={InputGroup.Button}
                                                        id="input-dropdown-addon"
                                                        title={this.state.selectedItem.name}>
                                            <MenuItem key="mod1" onClick={this.handleClick.bind(this,1)}>All {this.state.selectedItem.item===1?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                            <MenuItem key="mod2" onClick={this.handleClick.bind(this,2)}>Data Sets{this.state.selectedItem.item===2?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                            <MenuItem key="mod3" onClick={this.handleClick.bind(this,3)}>Indicators{this.state.selectedItem.item===3?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                            <MenuItem key="mod4" onClick={this.handleClick.bind(this,4)}>Programs{this.state.selectedItem.item===4?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                            <MenuItem key="mod5"onClick={this.handleClick.bind(this,5)}>Data Elements{this.state.selectedItem.item===5?<Glyphicon glyph="ok" bsStyle={"primary"} className={"pull-right"}/>:null}</MenuItem>
                                        </DropdownButton>
                                    </InputGroup.Button>
                                    <FormControl type="text" placeholder={"Search metadata here..."} autoFocus={true} style={{width: 500}} onChange={this.handleSearch } value={this.state.filterText}/>
                                </InputGroup>
                            </FormGroup>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Search results:</h3>
                        <hr/>
                        <Online>
                        {this.state.selectedItem.item===1?<div>{dataSets_Items}{indicator_Items}{programs_Items}{dataElements_Items}</div>:null}
                        {this.state.selectedItem.item===2?dataSets_Items:null}
                        {this.state.selectedItem.item===3?indicator_Items:null}
                        {this.state.selectedItem.item===4?programs_Items:null}
                        {this.state.selectedItem.item===5?dataElements_Items:null}
                        </Online>
                        <Offline>
                            <Alert bsStyle={"danger"}>You are offline. Check your internet connection and try again</Alert>
                        </Offline>
                        {/*indicator_Items*/}
                       {/* {dataSets_Items}
                        {dataElements_Items}
                        {programs_Items}*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NavbarCustom;