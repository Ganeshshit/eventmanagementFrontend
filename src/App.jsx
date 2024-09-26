import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "./components/Laout";
function App() {
  const [events, setEvents] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("https://eventbackend-7ny5.onrender.com/api/events/")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [isSuccess]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token=localStorage.getItem('authToken')
    axios
      .post(
        "https://eventbackend-7ny5.onrender.com/api/events/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the JWT token in Authorization header
          },
        }
      )
      .then((response) => {
        console.log("Event added successfully:", response.data);
        setFormData({
          title: "",
          description: "",
          location: "",
          date: "",
        });
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsSuccess(false);
        console.error("Error adding event:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://eventbackend-7ny5.onrender.com/api/events/${id}`)
      .then((response) => {
        console.log("Event deleted successfully:", response.data);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsSuccess(false);
        console.error("Error deleting event:", error);
      });
  };

  return (
    <Layout>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <div>
          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              padding: "1rem",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <h4 style={{ margin: 0 }}>GFG Event Dashboard</h4>
            <div>
              <button
                type="button"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  marginRight: "1rem",
                  cursor: "pointer",
                }}
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Add Event
              </button>
              <Link
                to="/"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "0.5rem 1rem",
                  textDecoration: "none",
                  borderRadius: "5px",
                }}
              >
                Home
              </Link>
            </div>
          </nav>

          <div style={{ padding: "2rem" }}>
            <h5 style={{ textAlign: "center", marginBottom: "2rem" }}>
              List of Events
            </h5>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Id
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Title
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Date
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Update
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {events?.map((event) => (
                  <tr key={event._id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {event._id}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {event.title}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {event.date}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <Link
                        to={`/update/${event._id}`}
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          padding: "0.3rem 0.7rem",
                          textDecoration: "none",
                          borderRadius: "5px",
                        }}
                      >
                        Update
                      </Link>
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <button
                        onClick={() => handleDelete(event._id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          padding: "0.3rem 0.7rem",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "5px",
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
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Event
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="inputAddress">Title</label>
                    <input
                      onChange={handleInputChange}
                      value={formData.title}
                      type="text"
                      className="form-control"
                      name="title"
                      id="inputAddress"
                      placeholder="Event Title"
                      style={{ width: "100%", padding: "0.5rem" }}
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="inputAddress2">Description</label>
                    <input
                      onChange={handleInputChange}
                      value={formData.description}
                      type="text"
                      className="form-control"
                      name="description"
                      id="inputAddress2"
                      placeholder="Enter Description"
                      style={{ width: "100%", padding: "0.5rem" }}
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="inputAddress2">Location</label>
                    <input
                      onChange={handleInputChange}
                      value={formData.location}
                      type="text"
                      className="form-control"
                      name="location"
                      id="inputAddress2"
                      placeholder="Enter Location"
                      style={{ width: "100%", padding: "0.5rem" }}
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="inputAddress2">Date</label>
                    <input
                      onChange={handleInputChange}
                      value={formData.date}
                      type="date"
                      className="form-control"
                      name="date"
                      id="inputAddress2"
                      style={{ width: "100%", padding: "0.5rem" }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "0.5rem 1rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Add Event
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
