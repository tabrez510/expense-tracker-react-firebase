import React from "react";
import heroImage from "../../assets/hero.jpg";
import feat1Image from "../../assets/feature_1.jpg";
import feat2Image from "../../assets/feature_2.jpg";
import feat3Image from "../../assets/feature_31.jpg";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const LandingPage = () => {
    const token = useSelector((state) => state.auth.token);
    const isLoggedIn = !!token;
  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero-section text-center py-5"
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-md-start text-center">
              <h1>Track Your Expenses Easily</h1>
              <p className="lead">
                Manage your finances with our user-friendly expense tracker app.
                Add, edit, and delete expenses effortlessly.
              </p>
              {isLoggedIn && <Link to="/dashboard">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>}
              {!isLoggedIn &&
              <Link to="/auth/signup">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>}
            </Col>
            <Col md={6} className="d-none d-md-flex">
              <Image src={heroImage} alt="Expense Tracking" fluid />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="features-section py-5">
        <Container>
          <Row className="text-center">
            <Col md={4}>
              <Image src={feat1Image} alt="Feature 1" fluid />
              <h3 className="mt-3">Add Expenses</h3>
              <p>
                Easily add your daily expenses and keep track of your spending.
              </p>
            </Col>
            <Col md={4}>
              <Image src={feat2Image} alt="Feature 2" fluid />
              <h3 className="mt-3">View Reports</h3>
              <p>
                Get detailed reports and insights into your financial habits.
              </p>
            </Col>
            <Col md={4}>
              <Image src={feat3Image} alt="Feature 3" fluid />
              <h3 className="mt-3">Secure & Private</h3>
              <p>
                Your data is safe with us. We prioritize your privacy and
                security.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-4"
        style={{ backgroundColor: "#343a40", color: "#fff" }}
      >
        <Container>
          <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
          <div>
            <a
              href="/"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Terms of Service
            </a>{" "}
            |{" "}
            <a
              href="/"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
