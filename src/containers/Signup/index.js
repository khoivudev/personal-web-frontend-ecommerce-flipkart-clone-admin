import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";
import { Redirect } from "react-router-dom";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Notification from "../../components/UI/Notification";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };

  if (user.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              {user.error !== "" && (
                <Notification messageType="danger" message={user.error} />
              )}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      value={firstName}
                      type="text"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      value={lastName}
                      type="text"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>

                <Input
                  label="Email address"
                  placeholder="Enter email"
                  value={email}
                  type="email"
                  controlId="formEmail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <Input
                  label="Password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  controlId="formPassword"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default Signup;
