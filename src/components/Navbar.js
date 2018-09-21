import React, {Component} from 'react';
import {Modal,Button,Nav,Navbar,MenuItem,NavItem,NavDropdown,FormGroup,FormControl,InputGroup,DropdownButton,Glyphicon} from 'react-bootstrap';
class NavbarCustom extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            value: ''
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(e) {
        this.setState({ value: e.target.value });
        this.setState({ show: true });
    }

    render() {
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
                                                <MenuItem key="1">Filter 1</MenuItem>
                                                <MenuItem key="2">Filter 2</MenuItem>
                                                <MenuItem key="3">Filter 3</MenuItem>
                                                <MenuItem key="4">Filter 4</MenuItem>
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
                                    <FormControl type="text" placeholder={"Search metadata here..."} autoFocus={true} style={{width: 600}} onKeyDown={this.handleShow}/>
                                </InputGroup>
                            </FormGroup>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Search results:</h3>
                        <hr/>
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