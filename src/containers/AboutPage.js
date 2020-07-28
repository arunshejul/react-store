import React, { Component } from "react";
import { Container, ListGroup } from "react-bootstrap";

class AboutPage extends Component {
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
        <ListGroup>
          <ListGroup.Item>
            <p>
              - Total Number of Mentions for 2020 and % of Growth versus 2019
            </p>
            <p>
              - Total Number of unique Domains for 2020 and % of Growth versus
              2019
            </p>
            <p>
              - Total Number of Positive Mentions for 2020 and % of Growth
              versus 2019
            </p>
            <p>
              - Total Number of Negative Mentions for 2020 and % of Growth
              versus 2019
            </p>
            <p>- Line Trend of Total of Mentions by day and Sentiment</p>
            <p>- One line for Positive and Sentiment</p>
            <p>- One line for Negative and Sentiment</p>
            <p>- One line for Neutral and Sentiment</p>
            <p>
              The use can select any point of the trend line to see a popup with
              a bar chart to see for that day the number of mentions by country.
              When the user deselect the popup needs to desapear.
            </p>
            <p>
              - For Brandwatch source one visualization that shows the size of
              Listerine in Oral Care.
            </p>
            <p>
              - I leave to them the way that they want to show this to see the
              creativity.
            </p>
            <p>
              In the end of the page they need to include the visualization sent
              in the zip file developed in D3.js to see if they are able to
              manage react and D3.
            </p>
            <p>
              They can present the results in a PPT with screenshots of the apps
              that they delevoped. Like that we don’t need to publish it in any
              of our server.
            </p>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    );
  }
}

export default AboutPage;
