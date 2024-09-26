import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/events")
      .then((response) => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Inline styles
  const containerStyle = {
    margin: "20px auto",
    maxWidth: "1140px",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#f8f9fa",
  };

  const cardStyle = {
    margin: "15px 0",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const cardBodyStyle = {
    padding: "20px",
  };

  const datePrimaryStyle = {
    display: "inline-block",
    textAlign: "center",
    marginRight: "10px",
  };

  const dateDayStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    display: "block",
  };

  const dateMonthStyle = {
    fontSize: "1rem",
    display: "block",
  };

  const meetingInfoStyle = {
    display: "inline-block",
  };

  const btnStyle = {
    marginTop: "10px",
    padding: "5px 10px",
    border: "1px solid #007bff",
    color: "#007bff",
    borderRadius: "4px",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <h4>GFG Event</h4>
        <Link to="/dashboard" className="btn btn-primary ml-auto">
          Dashboard
        </Link>
      </nav>
      <div className="row my-3">
        {events.map((event) => {
          const date = new Date(event.date);
          const day = date.getDate();
          const month = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear();
          return (
            <div className="col-lg-4" key={event.id}>
              <div style={cardStyle}>
                <div style={cardBodyStyle}>
                  <div className="widget-49">
                    <div className="widget-49-title-wrapper">
                      <div style={datePrimaryStyle}>
                        <span style={dateDayStyle}>{day}</span>
                        <span style={dateMonthStyle}>{month}</span>
                      </div>
                      <div style={meetingInfoStyle}>
                        <span>
                          <b>{event.title}</b>
                        </span>
                        <br />
                        <span>
                          <b>{event.location}</b>
                        </span>
                      </div>
                    </div>
                    <div className="widget-49-meeting-points">
                      <span>{event.description}</span>
                    </div>
                    <div className="widget-49-meeting-action">
                      <a href="#" style={btnStyle}>
                        {`${day}-${month}-${year}`}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
