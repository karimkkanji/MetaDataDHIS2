import React, {Component} from 'react';
import config from '../actions/config';
import ReactDOM from 'react-dom';
import {Breadcrumb, Col, Dropdown, Glyphicon, MenuItem, Panel, Row, Table} from 'react-bootstrap';
import './Tabpane.css';
import ButtonGroupDetails from './ButtonGroupDetails';
import Link from "react-router-dom/es/Link";
const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username + ":" + config.password)}`
    }
};
const dataSets = (deets) => (<tbody>
{/*Datasets*/}
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Date
        Created:
    </td>
    <td>{new Date(deets.created).toUTCString()}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Date
        Last Updated:
    </td>
    <td>{new Date(deets.lastUpdated).toUTCString()}</td>

</tr>
<tr>
    <td className="text-primary"
        style={{borderRight: '2px solid black'}}>Description:
    </td>
    <td>{(deets.description === undefined) ?
        <div style={{color: "#ff0000"}}>No description provided.</div> : deets.description}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Dimension
        Item Type:
    </td>
    <td>{deets.dimensionItemType}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Form
        Type::
    </td>
    <td>{deets.formType}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Period
        Type:
    </td>
    <td>{deets.periodType}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Short
        Name:
    </td>
    <td>{deets.shortName}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Timely
        submission days:
    </td>
    <td>{deets.timelyDays}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Version:
    </td>
    <td>{deets.version}</td>

</tr>
{/* End of Datasets*/}

</tbody>);
const indicators = (deets) => (<tbody>
{/*Datasets*/}
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Date
        Created:
    </td>
    <td>{new Date(deets.created).toUTCString()}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Date
        Last Updated:
    </td>
    <td>{new Date(deets.lastUpdated).toUTCString()}</td>

</tr>
<tr>
    <td className="text-primary"
        style={{borderRight: '2px solid black'}}>Description:
    </td>
    <td>{(deets.description === undefined) ?
        <div style={{color: "#ff0000"}}>No description provided.</div> : deets.description}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Dimension
        Item Type:
    </td>
    <td>{deets.dimensionItemType}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Indicator Type:
    </td>
    <td id={"indicatorTypes"}>Denominator will appear here</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Annualised:
    </td>
    <td>{(deets.annualized === false) ? <span>No</span> : <span>Yes</span>}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Short
        Name:
    </td>
    <td>{deets.shortName}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Name:
    </td>
    <td>{deets.name}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Display Name:
    </td>
    <td>{deets.displayName}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Display Short Name:
    </td>
    <td>{deets.displayShortName}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Numerator formula:
    </td>
    <td id={"numerator"}>Numerator will appear here</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Denominator formula:
    </td>
    <td id={"denominator"}>Denominator will appear here</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Indicator Groups:
    </td>
    <td id={"indicatorGroups"}>Indicator Groups will appear here</td>
</tr>
{/* End of Datasets*/}

</tbody>);
const programs = (deets) => (<tbody>
{/*Datasets*/}
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Date
        Created:
    </td>
    <td>{new Date(deets.created).toUTCString()}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Date
        Last Updated:
    </td>
    <td>{new Date(deets.lastUpdated).toUTCString()}</td>

</tr>
<tr>
    <td className="text-primary"
        style={{borderRight: '2px solid black'}}>Description:
    </td>
    <td>{(deets.description === undefined) ?
        <div style={{color: "#ff0000"}}>No description provided.</div> : deets.description}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Program Type::
    </td>
    <td>{deets.programType}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Short
        Name:
    </td>
    <td>{deets.shortName}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>
        Name:
    </td>
    <td>{deets.name}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>
       Display Name:
    </td>
    <td>{deets.displayName}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>
        Display Short Name:
    </td>
    <td>{deets.displayShortName}</td>

</tr>
{/* End of Datasets*/}

</tbody>);
const dataelements = (deets) => (<tbody>
{/*Datasets*/}
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Date
        Created:
    </td>
    <td>{new Date(deets.created).toUTCString()}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Date
        Last Updated:
    </td>
    <td>{new Date(deets.lastUpdated).toUTCString()}</td>

</tr>
<tr>
    <td className="text-primary"
        style={{borderRight: '2px solid black'}}>Description:
    </td>
    <td>{(deets.description === undefined) ?
        <div style={{color: "#ff0000"}}>No description provided.</div> : deets.description}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Dimension
        Item Type:
    </td>
    <td>{deets.dimensionItemType}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Form
        Name:
    </td>
    <td>{deets.formName}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Value
        Type:
    </td>
    <td>{deets.valueType}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Short
        Name:
    </td>
    <td>{deets.shortName}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Domain Type:
    </td>
    <td>{deets.domainType}</td>
</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Aggregation Type:
    </td>
    <td>{deets.aggregationType}</td>

</tr>
{/* End of Datasets*/}

</tbody>);
const numDenom = (deets) => (<div>
    <h5>Numerator Description</h5>
    <code>{deets.numeratorDescription}</code>
    <h5>Denominator Description</h5>
    <code>{deets.denominatorDescription}</code>
</div>);

function IndicatorGroup({groupsGotten}) {
    return <div>-{groupsGotten.name}</div>;
}

function IndicatorGroupList({indicatorGroups}) {
    return (
        <div>{indicatorGroups.map((groups) => <IndicatorGroup groupsGotten={groups} key={groups.name}/>)}</div>
    );
}

class DetailsMore extends Component {
    state = {
        activeDetails: [],
        myNumerator: []
    };

    callFromApi(){
        fetch(config.url+`${this.props.item}/${this.props.id}`, headers
        ).then((Response) => Response.json())
            .then((findresponse) => {
                this.setState({
                    activeDetails: findresponse,
                })
            });
    }
    render() {
        {this.callFromApi()}
        const deets = this.state.activeDetails;
        return (
            <div className={"detailsMoreBody container"}>
                <Row className="show-grid">
                    <Col xs={12} md={9}>
                        <Row>
                            <Col xs={3} md={3}>
                                <Dropdown id="dropdown-custom-1">
                                    <Dropdown.Toggle>
                                        <Glyphicon glyph="print"/>&nbsp;Export / Print Metadata
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="super-colors">
                                        <MenuItem eventKey="1" href={deets.href + ".csv"}>CSV</MenuItem>
                                        <MenuItem eventKey="2" href={deets.href + ".xlsx"}>Excel</MenuItem>
                                        <MenuItem eventKey="3" href={deets.href + ".pdf"}>PDF</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col xs={9} md={9}>
                                <Breadcrumb>
                                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item active>{this.props.item}</Breadcrumb.Item>
                                    <Breadcrumb.Item active>{this.props.id}</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <div className={'buttongroupDetsmarg'}>
                            <ButtonGroupDetails metadata={this.props.item}/>
                        </div>
                    </Col>
                    <Col xs={4} md={3}>
                        <Panel bsStyle={"info"}><Panel.Heading><Panel.Title
                            componentClass="h3">{deets.displayName}</Panel.Title></Panel.Heading></Panel>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <Panel>
                            <Panel.Body>
                                <h4>{deets.name}</h4>
                                <hr/>
                                <b>Identifier:</b><code>{this.props.id}</code>
                                <hr/>
                                {deets.version!==undefined?<div><b>Version:</b><code>{deets.version}</code><hr/></div>:null}
                                <h5>Related links</h5>
                                <ul type="none">
                                    <li><a href={deets.href}>API link</a></li>
                                </ul>
                                <hr/>
                                {this.props.item === "indicators" ? numDenom(deets) : null}
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col xs={12} md={8}>
                        <Panel>
                            <Panel.Body>
                                <Table responsive hover striped={true}>
                                    {
                                        (() => {
                                            switch (this.props.item) {
                                                case "dataSets":
                                                    return dataSets(deets);
                                                case "indicators":
                                                    this.getIndicatorTypes();
                                                    this.getIndicatorGroups();
                                                    this.getFormula("numerator");
                                                    this.getFormula("denominator");
                                                    return indicators(deets);
                                                case "programs":
                                                    return programs(deets);
                                                case "dataElements":
                                                    return dataelements(deets);
                                                default:
                                                    return "#FFFFFF";
                                            }
                                        })()
                                    }
                                </Table>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }

    getFormula(whattofetch) {
        const deets = this.state.activeDetails;
        let expression;
        if (whattofetch === "numerator") {
            expression = "" + deets.numerator + "";
        }
        else {
            expression = "" + deets.denominator + "";
        }
        expression = expression.replace(/#/g, "%23");
        expression = expression.replace(/{/g, "%7B");
        expression = expression.replace(/}/g, "%7D");
        expression = expression.replace(/\s/g, "%20");
        expression = expression.replace(/\+/g, "%2B");
        fetch(config.url+'expressions/description.json?expression=' + expression, headers)
            .then(
                function (response) {
                    return response.json();
                }
            ).then(function (jsonData) {
            //handle json data processing here
            ReactDOM.render(jsonData.description, document.querySelector("#" + whattofetch));
        });
    }

    getIndicatorGroups() {
        let expression = this.props.id;
        fetch(config.url+'indicators/' + expression + '.json?fields=indicatorGroups[name]', headers)
            .then(
                function (response) {
                    return response.json();
                }
            ).then(function (jsonData) {
            //handle json data processing here
            //console.log(jsonData.indicatorGroups);
            ReactDOM.render(<IndicatorGroupList
                indicatorGroups={jsonData.indicatorGroups}/>, document.querySelector("#indicatorGroups"));
        });
    }

    getIndicatorTypes() {
        let expression = this.props.id;
        fetch(config.url+'indicators/' + expression + '.json?fields=indicatorType[name]', headers)
            .then(
                function (response) {
                    return response.json();
                }
            ).then(function (jsonData) {
            //handle json data processing here
            ReactDOM.render(jsonData.indicatorType.name, document.querySelector("#indicatorTypes"));
        });
    }
}

export default DetailsMore;