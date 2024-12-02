import React, { useState, useEffect } from "react";
import axios from "axios";

const AxiosCrud = () => {
  const [data, setData] = useState([]); // State to store data
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [editingId, setEditingId] = useState(null);
  const url = process.env.REACT_APP_URL; //

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data); // Limit data for demo
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Input Change for Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create new data
  const handleCreate = async () => {
    try {
      const response = await axios.post(url, formData);
      setData([response.data, ...data]);
      setFormData({ title: "", body: "" });
      alert("Data added successfully!");
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  // Update existing data
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`${url}/${id}`, formData);
      setData(data.map((item) => (item.id === id ? response.data : item))); // Update local state
      setEditingId(null); // Exit edit mode
      setFormData({ title: "", body: "" }); // Reset form
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setData(data.filter((item) => item.id !== id)); // Remove from local state
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>CRUD Operations with Axios</h1>

      {/* Form for Create/Update */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Body"
          style={{ marginRight: "10px" }}
        />
        {editingId ? (
          <button onClick={() => handleUpdate(editingId)}>Update</button>
        ) : (
          <button onClick={handleCreate}>Add</button>
        )}
      </div>

      {/* Data Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Body</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.title}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.body}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setFormData({ title: item.title, body: item.body });
                  }}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AxiosCrud;
