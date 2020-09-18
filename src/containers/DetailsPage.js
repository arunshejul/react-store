import React, { Component } from "react";
import { Container, Col, Card, Image, Row } from "react-bootstrap";
import testData from "./../data/test_data.json";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { jsonData: testData.data };
  }

  componentDidMount() {
    //Add code here
  }

  componentWillUnmount() {
    //Add code here
  }

  render() {
    console.log(this.props.match.params.productId);
    const { jsonData } = this.state;
    const productId = this.props.match.params.productId;
    var product = jsonData
      .filter((product) => product.product_id === productId)
      .map((filteredProduct) => filteredProduct);

    console.log(JSON.stringify(product));

    return (
      <Container>
        <Card>
          <Row style={{ padding: 10 }}>
            <Col>
              <Image src={product[0].media[1].sizes[2].url} rounded />
            </Col>
            <Col>
              <h1>{product[0].title}</h1>
              <h5>Price: {product[0].price_str}</h5>
              <h5>Product: {product[0].product_id}</h5>
              <h5>Description: {product[0].description}</h5>
              <h5>Description: {product[0].description}</h5>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default DetailsPage;
