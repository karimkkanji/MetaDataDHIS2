import React, {Component} from 'react';
import './App.css';
import {Row, Panel,FormGroup,Checkbox,Form,Col} from 'react-bootstrap';
import Navbar from './Navbar';
import Tabpane from './Tabpane';
import DetailsMore from './DetailsMore';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

const HomeRoute = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/programs/:child" component={Programs}/>
                <Route path="/indicators/:child" component={Indicators}/>
                <Route path="/dataelements/:child" component={DataElements}/>
                <Route path="/datasets/:child" component={Datasets}/>
                <Route path="/search" component={Search}/>
                <Route component={NoMatch}/>
            </Switch>
        </div>
    </Router>
);

const Home = () => (
    <div>
        {/*This is the navbar component*/}
        <Navbar item="Data Elements"/>
        {/*Tabpane component shows the tabs*/}
        {/*this.state.showTabs ? <Tabpane changeHandler={this.changeStuff.bind(this)} /> : <DetailsMore />*/}
        <Tabpane/>
    </div>
)
const Programs = ({match}) => (
    <div>
        {/*This is the navbar component*/}
        <Navbar item="Data Elements"/>
        <DetailsMore id={match.params.child} item={"programDataElements"}/>
        {/*Tabpane component shows the tabs*/}
        {/*this.state.showTabs ? <Tabpane changeHandler={this.changeStuff.bind(this)} /> : <DetailsMore />*/}
    </div>
)
const Indicators = ({match}) => (
    <div>
        {/*This is the navbar component*/}
        <Navbar item="Data Elements"/>
        <DetailsMore id={match.params.child} item ={"indicators"}/>
        {/*Tabpane component shows the tabs*/}
        {/*this.state.showTabs ? <Tabpane changeHandler={this.changeStuff.bind(this)} /> : <DetailsMore />*/}
    </div>
)
const DataElements = ({match}) => (
    <div>
        {/*This is the navbar component*/}
        <Navbar item="Data Elements"/>
        <DetailsMore id={match.params.child} item={"dataElements"}/>
        {/*Tabpane component shows the tabs*/}
        {/*this.state.showTabs ? <Tabpane changeHandler={this.changeStuff.bind(this)} /> : <DetailsMore />*/}
    </div>
)
const Datasets = ({match}) => (
    <div>
        {/*This is the navbar component*/}
        <Navbar item="Data Elements"/>
        <DetailsMore id={match.params.child} item={"dataSets"}/>
        {/*Tabpane component shows the tabs*/}
        {/*this.state.showTabs ? <Tabpane changeHandler={this.changeStuff.bind(this)} /> : <DetailsMore />*/}
    </div>
)
const Search = () => (
    <div>
        {/*This is the navbar component*/}
        <Navbar item="Data Elements"/>
        <div className={"pageMargin container"}>
            <Row>
               <Panel style={{padding:10}}>
                   <h3>Filters:</h3>
                   <Form>
                       <FormGroup>
                       <Checkbox inline>1</Checkbox><br/><Checkbox inline>2</Checkbox><br/>
                       <Checkbox inline>5</Checkbox>
                   </FormGroup>
                   </Form>

               </Panel>
            </Row>
            <Row>
                <Panel style={{padding:10}}>
                <h1>
                    Results
                </h1>
                </Panel>
            </Row>
        </div>
        {/*Tabpane component shows the tabs*/}
        {/*this.state.showTabs ? <Tabpane changeHandler={this.changeStuff.bind(this)} /> : <DetailsMore />*/}
    </div>
)
const NoMatch = () => (
    <div>
        {/*This is the navbar component*/}
        <Navbar item="Data Elements"/>
        <section id="not-found" className={"pageMargin"}>
            <div className="circles">
                <p>404<br/>
                    <small>PAGE NOT FOUND</small>
                </p>
                <span className="circle big"></span>
                <span className="circle med"></span>
                <span className="circle small"></span>
            </div>
        </section>
        {/*Tabpane component shows the tabs*/}
        {/*this.state.showTabs ? <Tabpane changeHandler={this.changeStuff.bind(this)} /> : <DetailsMore />*/}
    </div>
)


export default HomeRoute;