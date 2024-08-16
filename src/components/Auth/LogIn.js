import React, { useContext, useRef, useState } from "react";
import { Container, Form, Button, Alert, FloatingLabel } from "react-bootstrap";
import styles from "./LogIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const LogIn = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    try {
      setIsloading(true);
      setError(null);
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        let error = "Authentication Failed";
        if (data && data.error && data.error.message) {
          error = data.error.message;
        }
        throw new Error(error);
      }

      authCtx.login(data.idToken, data.email);
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className={styles.signInBox}>
        <h2 className="text-center mb-4">LogIn</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <FloatingLabel
              controlId="formEmail"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailInputRef}
                // className={styles.floatingInput}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <FloatingLabel controlId="formPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
                // className={styles.floatingInput}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="mt-3 mb-3">
            <span>Forgot password ? </span>
            <Link to="/auth/forgotpassword">Click Here</Link>
          </div>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/auth/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default LogIn;
