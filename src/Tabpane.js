import React, { Component } from 'react';
import './Tabpane.css';

class Tabpane extends Component {
  render() {
    return (
      <div className="tabpanebody">
      <div className="container">
          <ul className="nav nav-tabs">
  <li role="presentation" className="active"><a href="#">Datasets</a></li>
  <li role="presentation"><a href="#">Programs</a></li>
  <li role="presentation"><a href="#">Indicators</a></li>
  <li role="presentation"><a href="#">Data Elements</a></li>
</ul>
</div>
      </div>

    );
  }
}

export default Tabpane;