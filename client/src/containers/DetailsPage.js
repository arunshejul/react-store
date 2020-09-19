import React, { Component } from "react";
import { Container, Col, Card, Image, Row } from "react-bootstrap";
import { connect } from "react-redux";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.match.params.productId);
    const productId = this.props.match.params.productId;
    var product = this.props.products
      .filter((product) => product.product_id === productId)
      .map((filteredProduct) => filteredProduct);

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

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(DetailsPage);
