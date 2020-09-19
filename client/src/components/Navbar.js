import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }
  componentDidMount() {
    localStorage.setItem("oUser", null);
    // Declare oUser in the global scope, as an empty object
    var oUser = {};
    // check for browser support of localStorage
    if (typeof localStorage == "undefined") {
      // Check failed, alert user
      alert("Your browser does not support the localStorage method!");
    } else {
      // wrapping this in a try...catch block, incase cookies are disabled
      try {
        // Attempt to pull oUser (by key) from localStorage, failure results
        // in oUser being an empty object.
        oUser = JSON.parse(localStorage.getItem("oUser")) || {};
        // Now check if oUser.name is NOT set
        if (!oUser.name) {
          // prompt user for a name
          oUser.name = prompt("Enter Name: ");
          // insert current date
          oUser.date = new Date().toUTCString();
          // save oUser in localStorage, stringified
          this.setState({ userName: oUser.name });
          localStorage.setItem("oUser", JSON.stringify(oUser));
        } else {
          // oUser.name was set, welcome them back
          this.setState({ userName: oUser.name });
          //var msgDis = document.getElementById("msgDisplay");
          //msgDisplay.innerHTML ="Hi " + oUser.name + " Welcome back! -->Date: " + oUser.date;
        }
      } catch (e) {
        // Cookies are disabled, which threw an error, alert the user
        alert("To use localStorage, you need to enable cookies.");
      }
    }
  }

  render() {
    return (
      <Container fluid>
        <Row style={{ backgroundColor: "#0C1D38" }}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Navbar
              style={{ backgroundColor: "#0C1D38", borderColor: "#0C1D38" }}
            >
              <Navbar.Brand style={{ color: "#FFF" }} href="/">
                React Store
              </Navbar.Brand>
              <Nav className="mr-left">
                <Nav.Link style={{ color: "#FFF" }} href="/">
                  Home
                </Nav.Link>
              </Nav>
              <Nav className="mr-left">
                <Nav.Link style={{ color: "#FFF" }} href="/aboutus">
                  About
                </Nav.Link>
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{ color: "#FFF" }}>
                  Welcome, {this.state.userName}
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(NavBar);
