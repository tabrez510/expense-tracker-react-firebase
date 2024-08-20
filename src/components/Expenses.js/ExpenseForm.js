import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Container,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../store/expense-actions";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = {
      amount,
      description,
      category,
    };
    setIsloading(true);
    await dispatch(addExpense(expense));
    setIsloading(false);
    setAmount("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <Container
      className="mt-4"
      bg={darkMode ? "dark" : "light"}
      data-bs-theme={darkMode ? "dark" : "light"}
    >
      <h3 className="text-center mt-5 mb-5">Add/Manage Your Expenses</h3>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-3">
          <Col md>
            <FloatingLabel controlId="floatingAmount" label="Amount">
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingDescription" label="Description">
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingCategory" label="Category">
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Fuel">Fuel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md>
            <Button variant="primary" type="submit" size="lg">
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </>
              ) : (
                "Add"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ExpenseForm;
