import React, { useState, useEffect } from "react";
import { Table, Button, Form, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  deleteExpense,
  editExpense,
} from "../../store/expense-actions";

const Expenses = () => {
  const [isLoading, setIsloading] = useState(false);
  const items = useSelector((state) => state.expense.items);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    setIsloading(true);
    dispatch(fetchExpenses()).finally(() => setIsloading(false));
  }, [dispatch]);

  const handleEdit = (id) => {
    const item = items.find((item) => item.id === id);
    setEditId(id);
    setEditData(item);
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleSaveEdited = () => {
    dispatch(editExpense(editId, editData));
    setEditId(null);
  };

  return (
    <Container
      className="mt-4"
      bg={darkMode ? "dark" : "light"}
      data-bs-theme={darkMode ? "dark" : "light"}
    >
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table responsive bordered hover size="sm">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) =>
              editId === item.id ? (
                <tr key={item.id}>
                  <td>
                    <Form.Control
                      type="number"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={editData.category}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                    >
                      <option value="Food">Food</option>
                      <option value="Fuel">Fuel</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={handleSaveEdited}
                    >
                      Save
                    </Button>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td>{item.amount}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td className="d-flex flex-row justify-content-between align-items-center">
                    <Button
                      size="sm"
                      data-testid="edit-btn"
                      variant="info"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm" 
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Expenses;
