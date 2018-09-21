import React, {Component} from 'react';
import config from '../actions/config'
import {
    Modal,
    Button,
    Nav,
    Navbar,
    MenuItem,
    NavItem,
    NavDropdown,
    FormGroup,
    FormControl,
    InputGroup,
    DropdownButton,
    Glyphicon,
    Panel, ButtonToolbar, ButtonGroup
} from 'react-bootstrap';
import Link from "react-router-dom/es/Link";
const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username+":"+config.password)}`
    }
};
class NavbarCustom extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            value: '',
            ind_results:[],
            ds_results: [],
            dataElements_results:[],
            programs_results:[],
            filterText:''
        };
    }
    componentWillMount(){

//----------------------------------------------------------------------------------
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(e) {
            this.setState({value: e.target.value});
        this.setState({ show: true });
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
                    console.log('filtertext() state inside componentwillmount', this.state.filterText)
                    console.log(this.state.ind_results)
                });

            fetch(config.url + `dataSets.json?filter=displayName:ilike:${this.state.filterText}`, headers)
                .then(response => response.json())
                .then(data => {

                    this.setState({
                        ds_results: data.dataSets
                    });
                    console.log(this.state.ds_results)
                });

            fetch(config.url + `dataElements.json?filter=displayName:ilike:${this.state.filterText}`, headers)
                .then(response => response.json())
                .then(data => {

                    this.setState({
                        dataElements_results: data.dataElements
                    });
                    console.log(this.state.dataElements_results)
                });

            fetch(config.url + `programs.json?filter=displayName:ilike:${this.state.filterText}`, headers)
                .then(response => response.json())
                .then(data => {

                    this.setState({
                        programs_results: data.programs
                    });
                    console.log(this.state.programs_results)
                });

            console.log(this.state.filterText);
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
                    </Panel.Body>
                </Panel>
            </div>
        ));

        return (
            <div>
                <Navbar fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">Metadata Dictionary</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavDropdown  title="Filters" id="basic-nav-dropdown">        <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight={true}>
                            <Navbar.Form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Button>
                                            <DropdownButton componentClass={InputGroup.Button}
                                                            id="input-dropdown-addon"
                                                            title="Filters">
                                                <MenuItem key="1">All <Glyphicon glyph="ok" bsStyle={"primary"}/></MenuItem>
                                                <MenuItem key="2">Data Sets</MenuItem>
                                                <MenuItem key="3">Indicators</MenuItem>
                                                <MenuItem key="4">Programs</MenuItem>
                                                <MenuItem key="1">Data Elements</MenuItem>
                                            </DropdownButton>
                                        </InputGroup.Button>
                                        <FormControl type="text" placeholder={"Search metadata here..."} style={{width: 300}}  onKeyDown={this.handleShow}/>
                                        <FormControl.Feedback><Glyphicon glyph="search" /></FormControl.Feedback>
                                    </InputGroup>
                                </FormGroup>
                            </Navbar.Form>
                        </Nav>
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
                                                               title="Filters">
                                            <MenuItem key="1">Filter 1</MenuItem>
                                            <MenuItem key="2">Filter 2</MenuItem>
                                            <MenuItem key="3">Filter 3</MenuItem>
                                            <MenuItem key="4">Filter 4</MenuItem>
                                        </DropdownButton>
                                    </InputGroup.Button>
                                    <FormControl type="text" placeholder={"Search metadata here..."} autoFocus={true} style={{width: 500}} onChange={ this.handleSearch } value={this.state.filterText}/>
                                </InputGroup>
                            </FormGroup>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Search results:</h3>
                        <hr/>
                        {indicator_Items}
                        {dataSets_Items}
                        {dataElements_Items}
                        {programs_Items}
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