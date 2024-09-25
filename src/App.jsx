// client/src/App.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import './index.css'
import { Link } from "react-router-dom";

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
    axios
      .post("https://eventbackend-7ny5.onrender.com/api/events/create", formData)
      .then((response) => {
        // handle success
        console.log("Event added successfully:", response.data);
        // Reset the form
        setFormData({
          title: "",
          description: "",
          location: "",
          date: "",
        });
        setIsSuccess(true);
      })
      .catch((error) => {
        // handle error
        setIsSuccess(false);
        console.error("Error adding event:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://eventbackend-7ny5.onrender.com/api/events/${id}`)
      .then((response) => {
        // handle success
        console.log("Event deleted successfully:", response.data);
        setIsSuccess(true);
      })
      .catch((error) => {
        // handle error
        setIsSuccess(false);
        console.error("Error deleting event:", error);
      });
  };

  return (
    <div>
      <div class="">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container my-2">
            <h4>GFG Event Dashboard</h4>
            <div>
              <button
                type="button"
                class="btn btn-success mx-3"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Add Event
              </button>
              <Link class="btn btn-primary ml-auto" to="/">
                Home
              </Link>
            </div>
          </div>
        </nav>
        <div class="container">
          <h5 class="text-center my-2">List of Events</h5>
          <table class="table table-striped border">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event) => (
                <tr key={event._id}>
                  <th>{event._id}</th>
                  <th>{event.title}</th>
                  <td>{event.date}</td>

                  <td>
                    <Link
                      class="btn btn-primary ml-auto"
                      to={`/update/${event._id}`}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-danger"
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
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add New Event
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="inputAddress">Title</label>
                  <input
                    onChange={handleInputChange}
                    value={formData.title}
                    type="text"
                    class="form-control"
                    name="title"
                    id="inputAddress"
                    placeholder="Event Title"
                  />
                </div>

                <div class="form-group mt-2">
                  <label for="inputAddress2">Description</label>
                  <input
                    onChange={handleInputChange}
                    value={formData.description}
                    type="text"
                    class="form-control"
                    name="description"
                    id="inputAddress2"
                    placeholder="Enter Description"
                  />
                </div>

                <div class="form-group mt-2">
                  <label for="inputAddress2">Location</label>
                  <input
                    onChange={handleInputChange}
                    value={formData.location}
                    type="text"
                    class="form-control"
                    name="location"
                    id="inputAddress2"
                    placeholder="Enter Location"
                  />
                </div>

                <div class="form-group mt-2">
                  <label for="inputAddress2">Date</label>
                  <input
                    onChange={handleInputChange}
                    value={formData.date}
                    type="date"
                    class="form-control"
                    name="date"
                    id="inputAddress2"
                    placeholder="Enter Date"
                  />
                </div>

                <button type="submit" class="btn btn-primary mt-3">
                  Add Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
