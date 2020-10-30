import React from "react";
import Layout from "../../components/Layout";
import { Row, Col, Container } from "react-bootstrap";
import "./style.css";

const Home = () => {
  return (
    <div>
      <Layout>
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              Side bar
            </Col>
            <Col md={10} className="right-container">
              Container
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default Home;
