import React, { Component } from "react";
import * as d3 from "d3";
import { Container, Row, Col } from "react-bootstrap";
import Donut from "./../components/donut/donut";

class LollipopChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = { anyText: "" };
  }

  componentDidMount() {
    //Add code here
  }

  componentWillUnmount() {
    //Add code here
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <h4>Horizontal lollipop chart in d3</h4>
            <Donut />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LollipopChartPage;
