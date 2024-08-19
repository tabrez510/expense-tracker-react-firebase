import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Container } from "react-bootstrap";
import { expenseActions } from "../../store/expense";
import { useDispatch, useSelector } from "react-redux";

const Expenses = () => {
  const items = useSelector((state) => state.expense.items);
  const [editId, setEditId] = useState(null);
  const uid = localStorage.getItem('uid');
  const [editData, setEditData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}.json`
        );
        const data = response.data;
        if (data) {
          const loadedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(expenseActions.saveData(loadedExpenses));
        }
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, [uid]);

  const handleEdit = (id) => {
    const item = items.find((item) => item.id === id);
    setEditId(id);
    setEditData(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}/${id}.json`
      );
      dispatch(expenseActions.removeItem(id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  }

  const handleSave = async () => {
    try {
      await axios.put(
        `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}/${editId}.json`,
        { ...editData, id: editId }
      );
      dispatch(expenseActions.editItem({id: editId, updatedExpense: { ...editData, id: editId }}));
      setEditId(null);
    } catch (error) {
      console.error("Failed to edit expense:", error);
    }
  };

  return (
    <Container className="mt-4" bg={darkMode?'dark':'light'} data-bs-theme={darkMode?'dark':'light'}>
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
                  <Button size="sm" variant="success" onClick={handleSave}>
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
    </Container>
  );
};

export default Expenses;
