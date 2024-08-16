import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";

const UpdateProfile = () => {
  
  const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const userIdToken = localStorage.getItem("Token"); 


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: userIdToken,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          let newError = "Failed to fetch user data.";
          if (data && data.error && data.error.message) {
            newError = data.error.message;
          }
          throw new Error(newError);
        }
        const userData = data.users[0];
        
        setUpdatedProfile({
          displayName: userData.displayName || "",
          photoUrl: userData.photoUrl || "",
          email: userData.email || "",
        });
        setIsEmailVerified(userData.emailVerified);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userIdToken]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setMessage('');
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: userIdToken,
            displayName: updatedProfile.displayName,
            photoUrl: updatedProfile.photoUrl,
            returnSecureToken: true,
          }),
        }
      );
      setMessage('Profile updated');
      setError(null);
    } catch (error) {
      setError("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailVerification = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: userIdToken,
          }),
        }
      );
      alert("Verification email sent!");
    } catch (error) {
      setError("Failed to send verification email.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Update Profile</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleUpdate}>
        <Row>
          <Col xs={12} md={6} >
            <Form.Group controlId="displayName">
              <FloatingLabel label="Name" className="mb-3">
                <Form.Control
                  type="text"
                  name="displayName"
                  value={updatedProfile.displayName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} >
            <Form.Group controlId="photoUrl">
              <FloatingLabel label="Photo URL" className="mb-3">
                <Form.Control
                  type="url"
                  name="photoUrl"
                  value={updatedProfile.photoUrl}
                  onChange={handleChange}
                  placeholder="Enter your photo URL"
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="email">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={updatedProfile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col className="d-flex align-items-center">
            {isEmailVerified ? (
              <small className="text-success">Email Verified</small>
            ) : (
              <Button
                variant="warning"
                size="sm"
                className="mt-2"
                onClick={sendEmailVerification}
              >
                Verify Email
              </Button>
            )}
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProfile;
