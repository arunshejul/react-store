import React, { Component } from "react";
import * as d3 from "d3";
import { Container, Row, Col } from "react-bootstrap";
import Bar from "./../components/bar/bar";

class BarChartPage extends Component {
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
            <h4>Bar chart in d3</h4>
            <Bar />
            <dl>
              <svg height="10" width="10">
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  stroke="green"
                  stroke-width="3"
                  fill="green"
                />
              </svg>
              <dd> - Positive </dd>

              <svg height="10" width="10">
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  stroke="purple"
                  stroke-width="3"
                  fill="purple"
                />
              </svg>
              <dd> - Neutral </dd>

              <svg height="10" width="10">
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  stroke="red"
                  stroke-width="3"
                  fill="red"
                />
              </svg>
              <dd> - Negative </dd>
            </dl>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BarChartPage;
