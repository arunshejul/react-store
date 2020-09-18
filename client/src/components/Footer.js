import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Footer = () => (
  <footer style={styles.footerBar}>
    <Container>
      <Row style={styles.rowStyle}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <p style={styles.copyRight}>&copy; 2020 KPMG - All Rights Reserved</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

const styles = {
  footerBar: {
    bottom: 0,
    width: "100%",
    position: "absolute",
    backgroundColor: "#0d1a3b",
  },
  rowStyle: {
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  copyRight: {
    marginTop: 10,
    color: "#7781A1",
    fontSize: "1rem",
    textAlign: "center",
  },
};

export default withRouter(Footer);
