import React from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Notification from "../../components/UI/Notification";
import Loading from "../../components/UI/Loading";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions";
import { Redirect } from "react-router-dom";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <div>
      <Layout>
        <Container>
          {auth.loading ? (
            <Loading message={"Loggin in...Please wait"} />
          ) : (
            <Row style={{ marginTop: "50px" }}>
              <Col md={{ span: 6, offset: 3 }}>
                {auth.error !== "" && (
                  <Notification messageType="danger" message={auth.error} />
                )}
                <Form onSubmit={handleSubmit}>
                  <Input
                    label="Email address"
                    placeholder="Enter email"
                    value={email}
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <Input
                    label="Password"
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Button variant="primary" type="submit">
                    Sign In
                  </Button>
                </Form>
              </Col>
            </Row>
          )}
        </Container>
      </Layout>
    </div>
  );
};

export default Signin;
