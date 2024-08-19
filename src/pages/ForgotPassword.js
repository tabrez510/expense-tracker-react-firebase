import React, { useState } from "react";
import styles from "../components/Auth/LogIn.module.css";
import { Form, Button, Alert, Container, FloatingLabel } from "react-bootstrap";
import Header from "../components/Layouts/Header";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let newError = "Failed to send password reset email.";
        if (data && data.error && data.error.message) {
          newError = data.error.message;
        }
        throw new Error(newError);
      }

      setMessage(
        "Password reset link has been sent to your email. Please check your inbox."
      );
      setEmail(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center vh-100" bg={darkMode?'dark':'light'} data-bs-theme={darkMode?'dark':'light'}>
        <div className={styles.signInBox} style={{backgroundColor:darkMode?'#000':'#fff'}}>
          <h2>Forgot Password</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleResetPassword}>
            <Form.Group controlId="email">
              <FloatingLabel label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Password Reset Link"}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
