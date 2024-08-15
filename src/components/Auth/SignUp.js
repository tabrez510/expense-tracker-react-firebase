import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className={styles.signUpBox}>
        <h2 className="text-center mb-4">Sign Up</h2>
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
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              className={styles.floatingInput}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
        <div className="text-center mt-3">
          <span>Have an account? </span>
          <a href="/signin">Login</a>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
