import React, { useContext, useRef, useState } from "react";
import { Container, Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const SignUp = () => {
  const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnfPasswordRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredCnfPassword = cnfPasswordRef.current.value;
    try{
      setError(null);
      setIsloading(true);
      if(enteredPassword !== enteredCnfPassword){
        throw new Error('Password did not match.');
      }
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
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
      if(!res.ok){
        let error = "SignUp Failed";
        if(data && data.error && data.error.message){
          error = data.error.message;
        }
        throw new Error(error);
      }

      authCtx.login(data.idToken, data.email);
      emailRef.current.value = '';
      passwordRef.current.value = '';
      cnfPasswordRef.current.value = '';
      navigate('/dashboard');
    } catch(err) {
      setError(err.message);
    } finally{
      setIsloading(false);
    }
  }
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className={styles.signUpBox}>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={formSubmitHandler}>
          <Form.Group controlId="formEmail" className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailRef}
                // className={styles.floatingInput}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
                // className={styles.floatingInput}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <FloatingLabel controlId="formConfirmPassword" label="Confirm Password">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={cnfPasswordRef}
                // className={styles.floatingInput}
              />
            </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
            Sign Up
          </Button>
        </Form>
        <div className="text-center mt-3">
          <span>Have an account? </span>
          <Link to="/auth/login">Login</Link>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
