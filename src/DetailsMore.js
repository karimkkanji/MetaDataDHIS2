import React, {Component} from 'react';
import {Row, Col, Panel, Label, Well, Dropdown, MenuItem, Glyphicon, Breadcrumb, Table} from 'react-bootstrap';
import './Tabpane.css';
import ButtonGroupDetails from './ButtonGroupDetails';

const headers = {
    headers: {
        'Authorization': `Basic ${btoa('evanpersie3@gmail.com:skolastikA97')}`
    }
}
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
    <td>{(deets.description===undefined)?<div style={{color:"#ff0000"}}>No description provided.</div>:deets.description}</td>

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
    <td>{(deets.description===undefined)?<div style={{color:"#ff0000"}}>No description provided.</div>:deets.description}</td>

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
    <td>{(deets.description===undefined)?<div style={{color:"#ff0000"}}>No description provided.</div>:deets.description}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Dimension
        Item Type:
    </td>
    <td>{deets.dimensionItemType}</td>

</tr>
<tr>
    <td className="text-primary" style={{borderRight: '2px solid black'}}>Aggregation type:
    </td>
    <td>{deets.aggregationType}</td>
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
    <td>{(deets.description===undefined)?<div style={{color:"#ff0000"}}>No description provided.</div>:deets.description}</td>

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
const numDenom = (deets) =>(
    <div>
    <h5>Numerator Description</h5>
    <code>{deets.numeratorDescription}</code>
<h5>Denominator Description</h5>
<code>{deets.denominatorDescription}</code>
    </div>
);

class DetailsMore extends Component {
    state = {
        activeDetails: []
    };
    componentDidMount = () => {
        fetch(`http://197.136.81.99:8082/test/api/${this.props.item}/${this.props.id}`, headers //youtube guy this.props.location.state.dynamicData
        ).then((Response) => Response.json())
            .then((findresponse) => {

                this.setState({
                    activeDetails: findresponse,


                });
                console.log(this.state.activeDetails)

            })

    };

    render() {
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
                                    <Breadcrumb.Item href="http://localhost:3000">Home</Breadcrumb.Item>
                                    <Breadcrumb.Item active>{this.props.item}</Breadcrumb.Item>
                                    <Breadcrumb.Item active>{this.props.id}</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <div className={'buttongroupDetsmarg'}>
                            <ButtonGroupDetails/>
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
                                <b>Version:</b><code>{deets.version}</code>
                                <hr/>
                                <h5>Related links</h5>
                                <ul type="none">
                                    <li><a href={deets.href}>API link</a></li>
                                </ul>
                                <hr/>
                                <h5>Tags</h5>
                                <Label bsStyle="default">Default</Label>{' '}
                                <Label bsStyle="primary">Primary</Label>{' '}
                                <Label bsStyle="success">Success</Label>
                                <hr/>
                                {this.props.item==="indicators"?numDenom(deets):null}
                            </Panel.Body>
                        </Panel>
                        <Panel>
                            <Panel.Body>Basic panel example</Panel.Body>
                        </Panel>
                    </Col>
                    <Col xs={12} md={8}>
                        <Panel>
                            <Panel.Body>
                                <Table responsive hover striped={true}>
                                    {
                                        (() => {
                                            console.log(this.props.item);
                                            switch (this.props.item) {
                                                case "dataSets":   return dataSets(deets);
                                                case "indicators": return indicators(deets);
                                                case "programDataElements":   return programs(deets);
                                                case "dataElements":  return dataelements(deets);
                                                default:      return "#FFFFFF";
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
}

export default DetailsMore;