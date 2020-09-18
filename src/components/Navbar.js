import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";

const NavBar = () => (
  <Container fluid>
    <Row style={{ backgroundColor: "#0C1D38" }}>
      <Col xs={12} sm={12} md={12} lg={12}>
        <Navbar style={{ backgroundColor: "#0C1D38", borderColor: "#0C1D38" }}>
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
        </Navbar>
      </Col>
    </Row>
  </Container>
);

export default withRouter(NavBar);
