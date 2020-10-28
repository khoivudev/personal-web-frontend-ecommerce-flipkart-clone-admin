import React from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

import { Container, Form, Button, Row, Col } from "react-bootstrap";

const Signin = () => {
  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Input
                  label="Email address"
                  placeholder="Enter email"
                  value=""
                  type="email"
                  controlId="formEmail"
                  onChange={() => {}}
                />

                <Input
                  label="Password"
                  placeholder="Password"
                  value=""
                  type="password"
                  controlId="formPassword"
                  onChange={() => {}}
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default Signin;
