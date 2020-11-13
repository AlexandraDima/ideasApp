import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar justify-content-center navbar-dark mx-auto">
        <Link className="navbar-brand" to="/" style={{color:'#201eaf'}}>
          <h3>IdeasExchange</h3>
        </Link>
       {/*  <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

     {/*    <div className="collapse navbar-collapse">
          <div className="navbar-nav mr-auto">
            <Link className="nav-item nav-link active" to="/">
              Home
            </Link>
          </div>
        
        </div> */}
      </nav>
    );
  }
}

export default Nav;
