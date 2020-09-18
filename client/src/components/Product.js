import React, { Component } from "react";
import { Col, Card, Carousel } from "react-bootstrap";
import Moment from "react-moment";

class Product extends Component {
  render() {
    var link = `details/${this.props.product.product_id}`;
    return (
      <Col xs style={{ marginTop: 10 }}>
        <Card style={{ width: 320, height: 350 }}>
          <Card.Img
            variant="top"
            style={{ width: "100%", height: "15vw", objectFit: "cover" }}
            src={this.props.product.media[0].sizes[4].url}
          />

          <Card.Body>
            <Card.Link href={link}>{this.props.product.title}</Card.Link>

            <Card.Text>
              Created at{" "}
              <Moment format="YYYY-MM-DD HH:mm">
                {this.props.product.created_at}
              </Moment>
            </Card.Text>
            <Card.Text>Starting at {this.props.product.price_str}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Product;
