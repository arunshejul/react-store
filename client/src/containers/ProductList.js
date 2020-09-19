import React, { Component } from "react";
import { Container, Row, Dropdown } from "react-bootstrap";
import Product from "../components/Product.js";
import { connect } from "react-redux";
import { setVisibilityFilter } from "../actions";
import { VisibilityFilters } from "../actions";

class ProductList extends Component {
  sortBy = (byID) => {
    this.props.sortBy(byID);
  };

  render() {
    return (
      <Container>
        <Row style={{ marginTop: 10 }}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort by
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.sortBy("SHOW_LOW_HIGH")}>
                Low to High(Price)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.sortBy("SHOW_HIGH_LOW")}>
                High to Low(Price)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.sortBy("SHOW_NAME")}>
                Name
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        <Row>
          {this.props.products.map((item) => (
            <Product key={item.product_id} product={item} />
          ))}
        </Row>
      </Container>
    );
  }
}

const getVisibleProducts = (products, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return products;
    case VisibilityFilters.SHOW_LOW_HIGH:
      return products.sort((a, b) => a.price - b.price);
    case VisibilityFilters.SHOW_HIGH_LOW:
      return products.sort((a, b) => b.price - a.price);
    case VisibilityFilters.SHOW_NAME:
      return products.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = (state) => ({
  products: getVisibleProducts(state.products, state.visibilityFilter),
  visibilityFilter: state.visibilityFilter,
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (id) => dispatch(setVisibilityFilter(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
