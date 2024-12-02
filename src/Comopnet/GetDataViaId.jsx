import React, { useState } from "react";

//get the Data via id
const url = "https://jsonplaceholder.typicode.com/posts";
async function getDataViaId(id) {
  const idurl = `${url}/${id}`;
  try {
    const response = await fetch(idurl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

const GetDataViaId = () => {
  const [id, setId] = useState(""); // State to store the input ID
  const [data, setData] = useState(null); // State to store the fetched data
  const [error, setError] = useState(null); // State to store any errors

  const handleSearch = () => {
    if (!id) {
      alert("Please enter an ID!");
      return;
    }
    getDataViaId(id);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Fetch Data by ID</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
          style={{
            padding: "8px",
            width: "200px",
            marginRight: "10px",
            fontSize: "14px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Result:</h2>
          <p>
            <strong>User ID:</strong> {data.userId}
          </p>
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>Title:</strong> {data.title}
          </p>
          <p>
            <strong>Body:</strong> {data.body}
          </p>
        </div>
      )}
    </div>
  );
};

export default GetDataViaId;
