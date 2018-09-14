import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
class Navbar extends Component {
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
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="javascript.void()">Metadata Dictionary</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="" className="dropdown-toggle" data-toggle="dropdown"
                                       role="button" aria-haspopup="true" aria-expanded="false">{this.props.item} filter<span
                                        className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href={null}>Action</a></li>
                                        <li><a href={null}>Another action</a></li>
                                        <li><a href={null}>Something else here</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href=href={null}>Separated link</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="navbar-form text-center">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search Metadata"
                                           style={{width: 300}}  value={this.state.value} onKeyDown={this.handleShow}/>
                                    <div className="input-group-btn">
                                        <button className="btn btn-default" type="submit">
                                            <i className="glyphicon glyphicon-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
                <Modal show={this.state.show} onHide={this.handleClose} bsSize={"large"}>
                    <Modal.Header closeButton>
                        <Modal.Title bsClass={"pull-center"}> <input  style={{width: 600}}className="form-control" autoFocus={true} placeholder={"Search metadata"} type={"text"}/></Modal.Title>
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

export default Navbar;