import React, { useEffect, useState } from "react";
import { useApi } from "./Api";

let data;
const url = "https://jsonplaceholder.typicode.com/posts";
//GetAllData
async function getData(setData) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    setData(json);
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}
export default function GetData() {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State for row being edited
  const [editFormData, setEditFormData] = useState({}); // State for edit form
  useEffect(() => {
    getData(setData);
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      // Update local state to remove the deleted item
      setData(data.filter((item) => item.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle Edit
  const handleEditClick = (item) => {
    setEditingRow(item.id); // Set the row being edited
    setEditFormData(item); // Populate edit form with row data
  };

  // Handle Input Changes in Edit Form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle Save Edited Data
  const handleSave = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT", // Use PUT or PATCH as needed
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const updatedItem = await response.json();

      // Update local state with the updated item
      setData(data.map((item) => (item.id === id ? updatedItem : item)));

      setEditingRow(null); // Exit edit mode
      alert("Data updated successfully!");
    } catch (error) {
      alert("Failed to update data: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              User ID
            </th>
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
                {item.userId}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingRow === item.id ? (
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  item.title
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingRow === item.id ? (
                  <input
                    type="text"
                    name="body"
                    value={editFormData.body || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  item.body
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingRow === item.id ? (
                  <>
                    <button
                      onClick={() => handleSave(item.id)}
                      style={{
                        marginRight: "5px",
                        padding: "5px 10px",
                        backgroundColor: "green",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRow(null)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(item)}
                      style={{
                        marginRight: "5px",
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
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
