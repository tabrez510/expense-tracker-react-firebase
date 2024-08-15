import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import styles from "./LogIn.module.css";

const LogIn = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className={styles.signInBox}>
        <h2 className="text-center mb-4">SignIn</h2>
        <Form>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              className={styles.floatingInput}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className={styles.floatingInput}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Sign In
          </Button>
        </Form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </Container>
  );
};

export default LogIn;
