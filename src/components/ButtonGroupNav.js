import React, {Component} from 'react';
import {
    ButtonGroup,
    ButtonToolbar,
    Button
} from 'react-bootstrap';
import './Tabpane.css';
import LetterResults from "./LetterResults";
import CustomAlert from "./CustomAlert";
class ButtonGroupNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
        };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(message) {
        this.setState({
            showComponent: true,
            valuePassed:message
        });
    }

    genCharArray(charA, charZ) {
        let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (i; i <= j; ++i) {
            let letGot = String.fromCharCode(i);
            a.push(<Button onClick={this.handleClick.bind(this, letGot)}
                                          key={i}>{String.fromCharCode(i)}</Button>);
        }
        return a;
    };
    render() {
        return (
            <div className="container buttonGroup">
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button onClick={this.handleClick.bind(this, "#")}>#</Button>
                        {this.genCharArray('A', 'Z')}
                    </ButtonGroup>
                </ButtonToolbar>
                {this.state.showComponent ?
                    <LetterResults letter={this.state.valuePassed} item={this.props.item}/> :
                    <CustomAlert for={this.props.item}/>
                }
            </div>
        );
    }
}

export default ButtonGroupNav;