import React , {Component} from 'react';

class Navbar extends Component{
render(){
return(
<div>
  <nav className="navbar navbar-default navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
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
          <a href="javascript.void()" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.item} filter<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="javascript.void()">Action</a></li>
            <li><a href="javascript.void()">Another action</a></li>
            <li><a href="javascript.void()">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="javascript.void()">Separated link</a></li>
          </ul>
        </li>
      </ul>
    <form className="navbar-form text-center">
  <div className="input-group">
    <input type="text" className="form-control" placeholder="Search Metadata" style={{width:300}} />
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
  </div>
);
}
}

export default Navbar;